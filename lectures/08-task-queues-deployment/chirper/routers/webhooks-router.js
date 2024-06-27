/**
 * This router handles all incoming webhooks.
 *
 * Interestingly, you'll have to custom implement a webhook endpoint
 * for each third party integration you have. This is because you do
 * not control the API specifications on how they make API calls to
 * you.
 */
import express from "express";

import { Chirp } from "../models/chirp.js";
import { Router } from "express";

export const webhooksRouter = Router();

webhooksRouter.post(
  "/twilio",
  express.urlencoded({ extended: true }),
  async (req, res, next) => {
    // This is missing webhook validation.
    // For twilio specifically, you should validate signatures.
    // https://www.twilio.com/docs/usage/webhooks/webhooks-security
    const chirp = await Chirp.create({
      content: req.body.Body,
    });
    req.io.emit("chirp", chirp);
    return res.json(chirp);
  },
);
