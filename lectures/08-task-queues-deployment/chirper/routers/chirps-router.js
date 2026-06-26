import { Queue } from "bullmq";

import { Chirp } from "../models/chirp.js";
import { Router } from "express";

import multer from "multer";
import path from "path";
const upload = multer({ dest: "uploads/" });

const chirpsQueue = new Queue("Chirps", {
  connection: {
    host: process.env.REDIS_URL || "localhost",
    port: process.env.REDIS_PORT || 6381,
  },
});

export const chirpsRouter = Router();

chirpsRouter.post("/", upload.single("image"), async (req, res, next) => {
  try {
    // NEW - instead of creating the chirp directly into the database,
    // we will add a job to the queue that will create the chirp.
    chirpsQueue.add("ChirpCreate", {
      content: req.body.content,
      imageMetadata: req.file,
      ChirpId: req.body.ChirpId,
    });
    // give a response to the user so they have the illusion that the chirp has been created.
    // when the user reloads, they won't see it.
    return res.status(202).json({
      content: req.body.content,
      imageMetadata: req.file,
    });
  } catch (e) {
    if (e.name === "SequelizeForeignKeyConstraintError") {
      return res.status(422).json({ error: "Invalid parent chirp id" });
    } else if (e.name === "SequelizeValidationError") {
      return res.status(422).json({
        error:
          "Invalid input parameters. Expected content, file and (optional) ChirpId",
      });
    } else {
      return res.status(400).json({ error: "Cannot create chirp" });
    }
  }
});

chirpsRouter.get("/", async (req, res, next) => {
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
  chirpsQueue.add("ChirpUpdate", {
    content: req.body.content,
    id: chirp.id,
  });

  // fake response to the user
  chirp.content = req.body.content;
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
