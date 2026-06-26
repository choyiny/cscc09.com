import http from "http";

import { sequelize } from "./datasource.js";
import express from "express";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import { chirpsRouter } from "./routers/chirps-router.js";
import { webhooksRouter } from "./routers/webhooks-router.js";
import { registerIOListeners } from "./sockets.js";
import { createAdapter } from "@socket.io/redis-adapter";
import { Redis } from "ioredis";

const PORT = 3000;
export const app = express();
// required to get socket server running with express
const httpServer = http.createServer(app);

app.use(bodyParser.json());
app.use(express.static("static"));

// this is a middleware function that logs the incoming request
app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// initialize a socket server
// this adds the GET /socket.io endpoint
const pubClient = new Redis(process.env.REDIS_URL || "redis://localhost:6381");
const subClient = pubClient.duplicate();
export const io = new Server(httpServer, {
  adapter: createAdapter(pubClient, subClient),
});
registerIOListeners(io);

app.use(function (req, res, next) {
  req.io = io;
  next();
});

app.use("/chirps", chirpsRouter);
app.use("/webhooks", webhooksRouter);

httpServer.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
