import dotenv from "dotenv";
dotenv.config();

import fetch, { Headers, Blob } from "node-fetch";
import { FormData } from "formdata-node";

if (!globalThis.fetch) globalThis.fetch = fetch;
if (!globalThis.Headers) globalThis.Headers = Headers;
if (!globalThis.Blob) globalThis.Blob = Blob;
if (!globalThis.FormData) globalThis.FormData = FormData;


import express from "express";
import cors from "cors";
import matchRoutes from "./routes/match.js";
console.log("Loaded OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "YES" : "NO");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/match", matchRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
