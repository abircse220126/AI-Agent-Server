require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { getPrompt, getFacebookPrompt, getVariationPrompt } = require("./prompt");
// const getFacebookPrompt = require("./prompt");
const { extractCode, extractAnalysis, extractIntent } = require("./aiHelper");

const app = express();
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// AI_agent
// 3c99ZOfggrwo8wJr
app.use(cors());
app.use(express.json());

// const uri = "mongodb+srv://AI_agent:3c99ZOfggrwo8wJr@cluster0.owrghg5.mongodb.net/?appName=Cluster0";
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    await client.connect();

    app.post("/generate", async (req, res) => {
      try {
        const { prompt } = req.body;
        const finalPrompt = getPrompt(prompt);

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: finalPrompt,
        });
        const text =
          response.text ||
          response?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "";
        console.log(text);

        const intent = extractIntent(text);
        const { score, analysis } = extractAnalysis(text);
        const html = extractCode(text);

        // console.log(html);

        res.send({
          html,
          intent,
          score,
          analysis,
        });
      } catch (err) {
        if (err.status === 429) {
          return res.status(429).send({
            error: "API limit reached. Try again later.",
          });
        }
        res.status(500).send({ error: "AI failed" });
      }
    });

    app.post("/facebook-ads", async (req, res) => {
      try {
        const { prompt } = req.body;
        const textPrompt = getFacebookPrompt(prompt);
        const textResponse = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: textPrompt,
        });

        const text =
          textResponse.text ||
          textResponse?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "";

        const raw =
          textResponse.text ||
          textResponse?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "";

        const cleaned = raw.replace(/`json/g, "").replace(/`/g, "").trim();
        const data = JSON.parse(cleaned);
        // console.log(data);
        res.send(data);

        // const headlineMatch = text.match(/Headline:\s*(.*)/i);
        // const primaryTextMatch = text.match(
        //   /Primary Text:\s*([\s\S]*?)Headline:/i,
        // );
        // const descriptionMatch = text.match(/Description:\s*(.*)/i);
        // const imagePromptMatch = text.match(/Image Prompt:\s*([\s\S]*)/i);
        // const audienceMatch = text.match(/Target Audience:\s*(.*)/i);
        // const ageMatch = text.match(/Target Age:\s*(.*)/i);
        // const genderMatch = text.match(/Target Gender:\s*(.*)/i);
        // const interestMatch = text.match(/Interests:\s*(.*)/i);
        // // const placementMatch = text.match(/Placement:\s*(.*)/i);
        // const budgetMatch = text.match(/Budget Suggestion:\s*(.*)/i);

        // const headline = headlineMatch?.[1]?.trim() || "";
        // const primaryText = primaryTextMatch?.[1]?.trim() || "";
        // const description = descriptionMatch?.[1]?.trim() || "";
        // const imagePrompt = imagePromptMatch?.[1]?.trim() || "";
        // const targetAudience = audienceMatch?.[1]?.trim() || "";
        // const targetAge = ageMatch?.[1]?.trim() || "";
        // const targetGender = genderMatch?.[1]?.trim() || "";
        // const interests = interestMatch?.[1]?.trim() || "";
        // // const placement = placementMatch?.[1]?.trim() || "";
        // const budget = budgetMatch?.[1]?.trim() || "";

        // // console.log(text);
        // // =========================
        // // STEP 2: IMAGE GENERATION
        // // =========================
        // // const imageResponse = await ai.models.generateContent({
        // //   model: "gemini-3.1-flash-image-preview",
        // //   contents: imagePrompt,
        // // });
        // // // 👉 extract image
        // // const imageBase64 =
        // //   imageResponse?.candidates?.[0]?.content?.parts?.find(
        // //     (p) => p.inlineData,
        // //   )?.inlineData?.data;
        // // const imageUrl = imageBase64
        // //   ? `data:image/png;base64,${imageBase64}`
        // //   : null;
        // // console.log(imageUrl);
        // // =========================
        // // FINAL RESPONSE
        // // =========================

        // const variationRegex =
        //   /Type:\s*(.*?)\nHeadline:\s*([\s\S]*?)\nPrimary Text:\s*([\s\S]*?)\nDescription:\s*([\s\S]*?)\nTarget Audience:\s*([\s\S]*?)\nTarget Age:\s*([\s\S]*?)\nTarget Gender:\s*([\s\S]*?)\nInterests:\s*([\s\S]*?)\nBudget Suggestion:\s*([\s\S]*?)(?=\n\d+\.|\n*$)/g;

        // let variations = [];
        // let match;
        // while ((match = variationRegex.exec(text)) !== null) {
        //   variations.push({
        //     type: match[1].trim(),
        //     headline: match[2].trim(),
        //     primaryText: match[3].trim(),
        //     description: match[4].trim(),
        //     targetAudience: match[5].trim(),
        //     targetAge: match[6].trim(),
        //     targetGender: match[7].trim(),
        //     interests: match[8].trim(),
        //     budget: match[9].trim(),
        //   });
        // }

        // res.send({
        //   headline,
        //   primaryText,
        //   description,
        //   targetAudience,
        //   targetAge,
        //   targetGender,
        //   interests,
        //   budget,
        //   variations,
        // });
      } catch (err) {
        console.log(err);
        res.status(500).send({ error: "AI failed" });
      }
    });

    app.post("/generate-variations", async (req, res) => {
      try {
        const { ad } = req.body;

        const finalPrompt = getVariationPrompt(ad);

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: finalPrompt,
        });

        const raw =
          response.text ||
          response?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "";

        const cleaned = raw
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
        const data = JSON.parse(cleaned);
        res.send(data);

      } catch (err) {
        console.log(err);
        res.status(500).send({
          error: "Variation generation failed",
        });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
