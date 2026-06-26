import { Worker } from "bullmq";
import { sequelize } from "./datasource.js";
import { Chirp } from "./models/chirp.js";
import OpenAI from "openai";
import "dotenv/config";
import { Redis } from "ioredis";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";

const openai = new OpenAI({
  apiKey: process.env["GEMINI_API_KEY"],
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function isContentRestricted(content) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Act as a censorship filter.
          If user input is offensive to US President Donald Trump,
          output "TRUE", otherwise, output "FALSE".`,
      },
      { role: "user", content: content },
    ],
    model: process.env["GEMINI_MODEL"] || "gemini-2.5-flash",
    temperature: 0,
    max_tokens: 10,
  });
  return chatCompletion.choices[0].message.content === "TRUE";
}

// See that I am establishing a new connection to the database here. Nothing is "shared" with
// the web server. This is a separate process, so it needs its own connection.
// However, all the "code" is reutilized, including the ORM models.
try {
  await sequelize.authenticate();
  // For the worker, I don't want to perform any updates to the schema. I want to leave that to
  // my web server for now.
  // await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// I also need to establish the connection to Redis (this time for websockets).
const pubClient = new Redis(process.env.REDIS_URL || "redis://localhost:6381");
const subClient = pubClient.duplicate();
export const io = new Server({ adapter: createAdapter(pubClient, subClient) });

async function onChirpCreated(jobData) {
  console.log(`Processing job: ${jobData.content}`);
  // sleep for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // vet the content before creating the chirp. If the chirp violates censorship policy, then
  // do not create the chirp.
  if (await isContentRestricted(jobData.content)) {
    console.log(`Create: Chirp content is restricted: ${jobData.content}`);
    return;
  }

  io.emit("chirp.post", jobData);

  // create the chirp
  return await Chirp.create(jobData);
}

async function onChirpUpdated(jobData) {
  // sleep for 5 seconds - mimics a long-running task
  // In a real-world scenario, this could be a more complex operation, such as processing
  // the chirp content, generating a summary, or performing some other time-consuming task.
  // This is just to simulate a delay before the chirp is updated.
  await new Promise((resolve) => setTimeout(resolve, 5000));
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
      port: process.env.REDIS_PORT || 6381,
    },
  },
);
