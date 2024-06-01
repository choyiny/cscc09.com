import { sequelize } from "./datasource.js";
import express from "express";
import bodyParser from "body-parser";
import { chirpsRouter } from "./routers/chirps-router.js";

const PORT = 3000;
export const app = express();

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

app.use("/chirps", chirpsRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
