import { sequelize } from "./datasource.js";
import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import { Chirp } from "./models/chirp.js";
import path from "path";

const PORT = 3000;
export const app = express();
const upload = multer({ dest: 'uploads/' })
app.use(bodyParser.json());

app.use(express.static("static"));

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.post("/chirps", upload.single('image'), async (req, res, next) => {
  // INSERT INTO Chirp (content, imageMetadata, ChirpId) VALUES (req.body.content, req.file, req.body.ChirpId)
  const chirp = await Chirp.create({
    content: req.body.content,
    imageMetadata: req.file,
    ChirpId: req.body.ChirpId,
  });
  return res.json(chirp);
});

app.get("/chirps", async (req, res, next) => {
  // const chirps = await Chirp.findAll({ limit: 20, where: { ChirpId: null }})
  // return res.json({ chirps })
  // Demonstration of N+1 problem
  // return res.json({
  //   chirps: await Promise.all(chirps.map(async (chirp) => {
  //     const replies = await Chirp.findAll({ where: { ChirpId: chirp.id } })
  //     return {
  //       id: chirp.id,
  //       content: chirp.content,
  //       createdAt: chirp.createdAt,
  //       updatedAt: chirp.updatedAt,
  //       Chirps: replies,
  //     };
  //   }))
  // });
  const chirps = await Chirp.findAll({
    limit: 5,
    where: {
      // only get top level chirps
      ChirpId: null,
    },
    include: Chirp
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

app.delete("/chirps/:id", async (req, res, next) => {
  const chirp = await Chirp.findByPk(req.params.id);
  if (!chirp) {
    return res
      .status(404)
      .json({ error: `Chirp(id=${req.params.id}) not found.` });
  }
  await chirp.destroy();
  return res.json(chirp);
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
