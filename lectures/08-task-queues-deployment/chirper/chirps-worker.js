import { Worker } from "bullmq";
import { sequelize } from "./datasource.js";
import { Chirp } from "./models/chirp.js";
import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

async function isContentRestricted(content) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          'If user input is offensive to the Chinese Communist Party, output "TRUE", otherwise, output "FALSE".',
      },
      { role: "user", content: content },
    ],
    model: "gpt-3.5-turbo-0125",
    temperature: 0,
    max_tokens: 10,
  });
  return chatCompletion.choices[0].message.content === "TRUE";
}

try {
  await sequelize.authenticate();
  // For the worker, I don't want to perform any updates to the schema. I want to leave that to
  // my web server for now.
  // await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

async function onChirpCreated(jobData) {
  // sleep for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // vet the content before creating the chirp. If the chirp violates censorship policy, then
  // do not create the chirp.
  if (await isContentRestricted(jobData.content)) {
    console.log(`Create: Chirp content is restricted: ${jobData.content}`);
    return;
  }

  // create the chirp
  return await Chirp.create(jobData);
}

async function onChirpUpdated(jobData) {
  // sleep for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));
  io.emit("chirp", jobData);
  // vet the content before creating the chirp. If the chirp violates censorship policy, then
  // do not create the chirp.
  if (await isContentRestricted(jobData.content)) {
    console.log(`Update: Chirp content is restricted: ${jobData.content}`);
    return;
  }

  // update the chirp from here
  const chirp = await Chirp.update(
    { content: jobData.content },
    {
      where: {
        id: jobData.id,
      },
    },
  );
  return chirp;
}

const jobsHandlers = {
  ChirpCreate: onChirpCreated,
  ChirpUpdate: onChirpUpdated,
};

const chirpsWorker = new Worker(
  "Chirps",
  async (job) => {
    const handler = jobsHandlers[job.name];
    if (handler) {
      return handler(job.data);
    }
  },
  {
    connection: {
      host: process.env.REDIS_URL || "localhost",
      port: process.env.REDIS_PORT || 6379,
    },
  },
);
