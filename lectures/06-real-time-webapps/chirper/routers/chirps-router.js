import { Chirp } from "../models/chirp.js";
import { Router } from "express";

import multer from "multer";
import path from "path";
const upload = multer({ dest: "uploads/" });

export const chirpsRouter = Router();

chirpsRouter.post("/", upload.single("image"), async (req, res, next) => {
  // INSERT INTO chirps (content, imageMetadata, ChirpId) VALUES (req.body.content, req.file, req.body.ChirpId)
  // const chirp = await Chirp.create({
  //   content: req.body.content,
  //   imageMetadata: req.file,
  //   ChirpId: req.body.ChirpId,
  // });
  // return res.json(chirp);

  try {
    const chirp = await Chirp.create({
      content: req.body.content,
      imageMetadata: req.file,
      ChirpId: req.body.ChirpId,
    });
    req.io.emit("chirp", chirp);
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
  // rewrite above to order by createdAt desc
  // const chirps = await Chirp.findAll({
  //   limit: 20,
  //   where: {
  //     // only get top level chirps
  //     ChirpId: null,
  //   },
  //   order: [
  //     ['createdAt', 'DESC']
  //   ]
  // });
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
