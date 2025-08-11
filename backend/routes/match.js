import express from "express";
import OpenAI from "openai";

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ analysis: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
