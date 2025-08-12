import express from "express";
import OpenAI from "openai";
import fetch from "node-fetch";
if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}
import dotenv from "dotenv";
dotenv.config();


const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  fetch
});

router.post("/", async (req, res) => {
  try {
    const { resumeText, jobDescription, bulletPoints } = req.body;

    const prompt = `
        You are an expert recruiter. Analyze the resume and job description.

        Resume:
        ${resumeText}

        Job Description:
        ${jobDescription}

        1. Give a match score (0-100).
        2. List missing but relevant keywords.
        3. Suggest improved versions of these bullet points:
        ${bulletPoints.map(bp => "- " + bp).join("\n")}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ analysis: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
