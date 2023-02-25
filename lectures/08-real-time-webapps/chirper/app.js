import { sequelize } from "./datasource.js";
import { Server } from "socket.io";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import multer from "multer";
import { Chirp } from "./models/chirp.js";
import path from "path";

const PORT = 3000;
export const app = express();
// required to get socket server running with express
const httpServer = http.createServer(app);
const upload = multer({ dest: "uploads/" });
app.use(bodyParser.json());

app.use(express.static("static"));

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// initialize a socket server
const io = new Server(httpServer);

// socket listeners
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.post("/chirps", upload.single("image"), async (req, res, next) => {
  const chirp = await Chirp.create({
    content: req.body.content,
    imageMetadata: req.file,
    ChirpId: req.body.ChirpId,
  });
  // emits the chirp to all connected clients
  io.emit("chirp", chirp);
  return res.json(chirp);
});

app.get("/chirps", async (req, res, next) => {
  const chirps = await Chirp.findAll({
    limit: 10,
    where: {
      // only get top level chirps
      ChirpId: null,
    },
    order: [["createdAt", "DESC"]],
    include: Chirp,
  });
  return res.json({ chirps });
});

app.get("/chirps/:id/image", async (req, res, next) => {
  const chirp = await Chirp.findByPk(req.params.id);
  if (!chirp) {
    return res
      .status(404)
      .json({ error: `Chirp(id=${req.params.id}) not found.` });
  }
  if (!chirp.imageMetadata) {
    return res
      .status(404)
      .json({ error: `Chirp(id=${req.params.id}) has no image.` });
  }
  res.setHeader("Content-Type", chirp.imageMetadata.mimetype);
  res.sendFile(chirp.imageMetadata.path, { root: path.resolve() });
});

app.patch("/chirps/:id/", async (req, res, next) => {
  const chirp = await Chirp.findByPk(req.params.id);
  if (!chirp) {
    return res
      .status(404)
      .json({ error: `Chirp(id=${req.params.id}) not found.` });
  }
  await chirp.update({
    content: req.body.content,
  });
  await chirp.reload();
  return res.json(chirp);
});

app.delete("/chirps/:id/", async (req, res, next) => {
  const chirp = await Chirp.findByPk(req.params.id);
  if (!chirp) {
    return res
      .status(404)
      .json({ error: `Chirp(id=${req.params.id}) not found.` });
  }
  await chirp.destroy();
  return res.json(chirp);
});

app.post("/webhook/twilio", express.urlencoded({extended:false}), async (req, res, next) => {
  // FYI - this is missing validation!
  const chirp = await Chirp.create({
    content: req.body.Body,
  });
  io.emit("chirp", chirp);
  return res.json(chirp);
});

httpServer.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
