import { sequelize } from "./datasource.js";
import express from "express";
import bodyParser from "body-parser";
import { chirpsRouter } from "./routers/chirps-router.js";
import { User } from "./models/user.js";

const PORT = 3001;
export const app = express();

// Basic Auth implementation
app.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    // this header shows that the browser should prompt for credentials
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
  // This is a demonstration of a plain text password check, which is completely
  // insecure. If we are ever thinking of storing passwords, it should be salted
  // and hashed using a library like bcrypt.
  if (!user || user.password !== password) {
    // this header shows that the browser should prompt for credentials
    res.setHeader("WWW-Authenticate", 'Basic realm="Chirper"');
    return res.status(401).json({ error: "Invalid username or password" });
  }
  req.user = user;
  next();
});

app.use(bodyParser.json());
app.use(express.static("static"));

// this is a middleware function that logs the incoming request
app.use(function (req, res, next) {
  // as you can see, we are logging the request body, which is useful for debugging
  // however, in production, the username & password might come in the body...
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

app.use("/chirps", chirpsRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
