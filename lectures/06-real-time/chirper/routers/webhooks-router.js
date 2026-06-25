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

webhooksRouter.post("/slack", express.json(), async (req, res, next) => {
  console.log("[slack webhook]", JSON.stringify(req.body));

  // This is missing webhook validation.
  // For Slack specifically, you should validate the X-Slack-Signature
  // header against your signing secret.
  // https://api.slack.com/authentication/verifying-requests-from-slack

  // Slack sends a one-time url_verification handshake when you
  // configure the Request URL in Event Subscriptions.
  if (req.body.type === "url_verification") {
    return res.json({ challenge: req.body.challenge });
  }

  // Both message.channels and message.im arrive as an event_callback
  // wrapping an event of type "message". channel_type distinguishes
  // them ("channel" vs "im") if you need to branch.
  if (req.body.type === "event_callback") {
    const event = req.body.event;

    // Ignore bot messages and edits/deletes so the bot doesn't echo itself.
    if (event?.type === "message" && !event.bot_id && !event.subtype) {
      const chirp = await Chirp.create({
        content: event.text,
      });
      req.io.emit("chirp.post", chirp);
    }
  }

  // Slack expects a 2xx within 3 seconds or it retries.
  return res.sendStatus(200);
});
