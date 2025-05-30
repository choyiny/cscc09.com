import { Chirp } from "../models/chirp.js";
import { Router } from "express";

import multer from "multer";
import path from "path";
const upload = multer({ dest: "uploads/" });

export const chirpsRouter = Router();

chirpsRouter.post("/", upload.single("image"), async (req, res, next) => {
  // INSERT INTO chirps (content, imageMetadata, ChirpId) VALUES (req.body.content, req.file, req.body.ChirpId)

  /**
   * In this snippet, we are creating a new chirp without any user input validations.
   */
  const chirp = await Chirp.create({
    content: req.body.content,
    imageMetadata: req.file,
    ChirpId: req.body.ChirpId,
  });
  return res.json(chirp);
});

chirpsRouter.get("/", async (req, res, next) => {
  const output = [];
  const chirps = await Chirp.findAll({
    limit: 20,
    where: {
      // only get top level chirps
      ChirpId: null,
    },
    order: [["createdAt", "DESC"]],
  });
  if (!chirps) {
    return res.status(404).json({ error: "No chirps found." });
  }
  for (const chirp of chirps) {
    const replies = await Chirp.findAll({ where: { ChirpId: chirp.id } });
    output.push({
      id: chirp.id,
      content: chirp.content,
      // imageMetadata: chirp.imageMetadata,
      createdAt: chirp.createdAt,
      updatedAt: chirp.updatedAt,
      Chirps: replies,
    });
  }
  return res.json({ chirps: output });
});

chirpsRouter.get("/:id/image", async (req, res, next) => {
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

chirpsRouter.patch("/:id", async (req, res, next) => {
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

chirpsRouter.delete("/:id", async (req, res, next) => {
  const chirp = await Chirp.findByPk(req.params.id);
  if (!chirp) {
    return res
      .status(404)
      .json({ error: `Chirp(id=${req.params.id}) not found.` });
  }
  await chirp.destroy();
  return res.json(chirp);
});
