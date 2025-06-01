import { Op } from "sequelize";

import { Chirp } from "../models/chirp.js";
import { Router } from "express";

import multer from "multer";
import path from "path";
import { validateInput } from "../utils/validate-input.js";

const upload = multer({ dest: "uploads/" });
export const chirpsRouter = Router();

chirpsRouter.post("/", upload.single("image"), async (req, res, next) => {
  const schema = [
    { name: "content", required: true, type: "string", location: "body" },
    { name: "image", required: false, type: "file", location: "file" },
    { name: "ChirpId", required: false, type: "number", location: "body" },
  ];
  if (!validateInput(req, res, schema)) return;

  try {
    // INSERT INTO chirps (content, imageMetadata, ChirpId) VALUES (req.body.content, req.file, req.body.ChirpId)
    const chirp = await Chirp.create({
      content: req.body.content,
      imageMetadata: req.file,
      ChirpId: req.body.ChirpId,
    });
    return res.json(chirp);
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
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const cursor = req.query.cursorId;

  const where = {
    // only get top level chirps
    ChirpId: null,
  };
  if (cursor) {
    where.id = { [Op.lt]: cursor }; // get chirps with id less than cursor
  }

  const chirps = await Chirp.findAll({
    limit: limit,
    where: where,
    order: [["createdAt", "DESC"]],
    include: Chirp,
  });
  if (chirps.length === 0) {
    return res.json({ chirps: [], cursor: null });
  }
  return res.json({
    chirps,
    cursor: chirps[chirps.length - 1].id,
  });
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
