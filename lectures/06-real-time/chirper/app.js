import http from "http";
import express from "express";
import bodyParser from "body-parser";
import { Server } from "socket.io";

import { sequelize } from "./datasource.js";
import { chirpsRouter } from "./routers/chirps-router.js";
import { User } from "./models/user.js";
import { webhooksRouter } from "./routers/webhooks-router.js";
import { registerIOListeners } from "./sockets.js";

const PORT = 3001;
const app = express();
const httpServer = http.createServer(app);

app.use(bodyParser.json());
app.use(express.static("static"));

// initialize a socket server
// this adds the GET /socket.io endpoint
export const io = new Server(httpServer);
registerIOListeners(io);

app.use(function (req, res, next) {
  req.io = io;
  next();
});

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

// Basic Auth implementation
app.use("/chirps", async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Chirper"');
    return res
      .status(401)
      .json({ error: "Missing or invalid Authorization header" });
  }
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii",
  );
  const [username, password] = credentials.split(":");

  const user = await User.findOne({ where: { username } });
  if (!user || user.password !== password) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Chirper"');
    return res.status(401).json({ error: "Invalid username or password" });
  }
  req.user = user;
  next();
});

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use("/chirps", chirpsRouter);
app.use("/webhooks", webhooksRouter);

httpServer.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
