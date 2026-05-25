// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const { GoogleGenAI } = require("@google/genai");
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const {
//   getPrompt,
//   getFacebookPrompt,
//   getVariationPrompt,
//   getCompetitorUrlPrompt,
//   getCompetitorCopyPrompt,
// } = require("./prompt");
// // const getFacebookPrompt = require("./prompt");
// const { extractCode, extractAnalysis, extractIntent } = require("./aiHelper");

// const app = express();
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// // AI_agent
// // 3c99ZOfggrwo8wJr
// app.use(cors());
// app.use(express.json());

// const axios = require("axios");
// const cheerio = require("cheerio");
// const puppeteer = require("puppeteer");

// // Scraping Code

// // const scrapeWebsite = async (url) => {
// //   const { data } = await axios.get(url, {
// //     headers: {
// //       "User-Agent": "Mozilla/5.0",
// //     },
// //   });

// //   const $ = cheerio.load(data);

// //   // Basic SEO Info
// //   const title = $("title").text().trim();

// //   const metaDescription = $('meta[name="description"]').attr("content") || "";

// //   // Headings
// //   const headings = [];

// //   $("h1, h2, h3").each((i, el) => {
// //     const text = $(el).text().trim();

// //     if (text) {
// //       headings.push(text);
// //     }
// //   });

// //   // Important Paragraphs
// //   const paragraphs = [];

// //   $("p").each((i, el) => {
// //     const text = $(el).text().trim();

// //     if (text.length > 40) {
// //       paragraphs.push(text);
// //     }
// //   });

// //   // CTA Buttons
// //   const ctas = [];

// //   $("button, a").each((i, el) => {
// //     const text = $(el).text().trim();

// //     if (
// //       text.includes("Buy") ||
// //       text.includes("Start") ||
// //       text.includes("Get") ||
// //       text.includes("Shop") ||
// //       text.includes("Claim") ||
// //       text.includes("Try")
// //     ) {
// //       ctas.push(text);
// //     }
// //   });

// //   return {
// //     title,
// //     metaDescription,
// //     headings: headings.slice(0, 20),
// //     paragraphs: paragraphs.slice(0, 20),
// //     ctas,
// //   };
// // };

// /* =========================
//    SAFE UTILITIES
// ========================= */
// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// const safeJSON = (text) => {
//   try {
//     const cleaned = text
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     return JSON.parse(cleaned);
//   } catch (e) {
//     return null;
//   }
// };

// // url type detection
// const detectUrlType = (url) => {
//   if (url.includes("facebook.com/ads/library")) {
//     return "fb_ads_library";
//   }

//   if (url.includes("http") && !url.includes("facebook.com")) {
//     return "landing_page";
//   }

//   return "unknown";
// };

// // Landing page scraper - focused on extracting content that can help AI understand the page for ad generation
// const scrapeLandingPage = async (url) => {
//   const { data } = await axios.get(url, {
//     headers: {
//       "User-Agent": "Mozilla/5.0",
//     },
//   });

//   const $ = cheerio.load(data);

//   const title = $("title").text().trim();

//   const description = $('meta[name="description"]').attr("content") || "";

//   const headings = [];
//   $("h1, h2, h3").each((i, el) => {
//     headings.push($(el).text().trim());
//   });

//   const paragraphs = [];
//   $("p").each((i, el) => {
//     const text = $(el).text().trim();
//     if (text.length > 40) paragraphs.push(text);
//   });

//   return {
//     type: "landing",
//     title,
//     description,
//     headings: headings.slice(0, 15),
//     body: paragraphs.slice(0, 15),
//   };
// };

// // Facebook Ads Library scraper - focused on extracting ad copy and targeting info
// // const scrapeFacebookAds = async (url) => {
// //   let browser;

// //   try {
// //     browser = await puppeteer.launch({
// //       headless: "new",
// //       args: ["--no-sandbox", "--disable-setuid-sandbox"],
// //     });

// //     const page = await browser.newPage();

// //     await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");

// //     await page.goto(url, {
// //       waitUntil: "networkidle2",
// //       timeout: 30000,
// //     });

// //     await page.waitForTimeout(5000);

// //     const content = await page.evaluate(() => {
// //       return document.body.innerText;
// //     });

// //     return {
// //       type: "facebook_ads",
// //       rawText: content.slice(0, 8000),
// //     };
// //   } catch (err) {
// //     console.log("FB scrape failed:", err.message);

// //     return null;
// //   } finally {
// //     if (browser) await browser.close();
// //   }
// // };

// /* =========================
//    FACEBOOK ADS SCRAPER (ROBUST)
// ========================= */
// const scrapeFacebookAds = async (url) => {
//   let browser;

//   try {
//     browser = await puppeteer.launch({
//       headless: "new",
//       args: [
//         "--no-sandbox",
//         "--disable-setuid-sandbox",
//         "--disable-dev-shm-usage",
//       ],
//     });

//     const page = await browser.newPage();

//     await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");

//     await page.goto(url, {
//       waitUntil: "domcontentloaded",
//       timeout: 45000,
//     });

//     await sleep(3000);

//     const data = await page.evaluate(() => {
//       return {
//         text: document.body.innerText,
//         title: document.title,
//       };
//     });

//     return {
//       type: "facebook_ads",
//       rawText: (data.text || "").slice(0, 10000),
//       title: data.title || "",
//     };
//   } catch (err) {
//     return null;
//   } finally {
//     if (browser) await browser.close();
//   }
// };

// // Main scraper function that detects URL type and scrapes accordingly
// const fallbackAnalyze = (url) => {
//   return {
//     type: "fallback",
//     note: "Scraping failed, using AI inference from URL only",
//     url,
//   };
// };

// const getScrapedData = async (url) => {
//   const type = detectUrlType(url);

//   // 1. LANDING PAGE
//   if (type === "landing_page") {
//     return await scrapeLandingPage(url);
//   }

//   // 2. FACEBOOK ADS LIBRARY
//   if (type === "fb_ads_library") {
//     const fbData = await scrapeFacebookAds(url);

//     if (fbData) return fbData;

//     // fallback if puppeteer fails
//     return fallbackAnalyze(url);
//   }

//   // 3. UNKNOWN
//   return fallbackAnalyze(url);
// };

// // const uri = "mongodb+srv://AI_agent:3c99ZOfggrwo8wJr@cluster0.owrghg5.mongodb.net/?appName=Cluster0";
// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// async function run() {
//   try {
//     await client.connect();

//     app.post("/generate", async (req, res) => {
//       try {
//         const { prompt } = req.body;
//         const finalPrompt = getPrompt(prompt);

//         const response = await ai.models.generateContent({
//           model: "gemini-2.5-flash",
//           contents: finalPrompt,
//         });
//         const text =
//           response.text ||
//           response?.candidates?.[0]?.content?.parts?.[0]?.text ||
//           "";
//         console.log(text);

//         const intent = extractIntent(text);
//         const { score, analysis } = extractAnalysis(text);
//         const html = extractCode(text);

//         // console.log(html);

//         res.send({
//           html,
//           intent,
//           score,
//           analysis,
//         });
//       } catch (err) {
//         if (err.status === 429) {
//           return res.status(429).send({
//             error: "API limit reached. Try again later.",
//           });
//         }
//         res.status(500).send({ error: "AI failed" });
//       }
//     });

//     app.post("/facebook-ads", async (req, res) => {
//       try {
//         const { prompt, mode } = req.body;
//         // const textPrompt = getFacebookPrompt(prompt);

//         let textPrompt;

//         if (mode === "link") {
//           const scrapedData = await getScrapedData(prompt);
//           textPrompt = getCompetitorUrlPrompt(scrapedData);
//         } else if (mode === "addCopy") {
//           textPrompt = getCompetitorCopyPrompt(prompt);
//         } else {
//           textPrompt = getFacebookPrompt(prompt);
//         }

//         const textResponse = await ai.models.generateContent({
//           model: "gemini-2.5-flash",
//           contents: textPrompt,
//         });

//         const text =
//           textResponse.text ||
//           textResponse?.candidates?.[0]?.content?.parts?.[0]?.text ||
//           "";

//         const raw =
//           textResponse.text ||
//           textResponse?.candidates?.[0]?.content?.parts?.[0]?.text ||
//           "";

//         const cleaned = raw.replace(/`json/g, "").replace(/`/g, "").trim();
//         const data = JSON.parse(cleaned);
//         // console.log(data);
//         res.send(data);

//         // const headlineMatch = text.match(/Headline:\s*(.*)/i);
//         // const primaryTextMatch = text.match(
//         //   /Primary Text:\s*([\s\S]*?)Headline:/i,
//         // );
//         // const descriptionMatch = text.match(/Description:\s*(.*)/i);
//         // const imagePromptMatch = text.match(/Image Prompt:\s*([\s\S]*)/i);
//         // const audienceMatch = text.match(/Target Audience:\s*(.*)/i);
//         // const ageMatch = text.match(/Target Age:\s*(.*)/i);
//         // const genderMatch = text.match(/Target Gender:\s*(.*)/i);
//         // const interestMatch = text.match(/Interests:\s*(.*)/i);
//         // // const placementMatch = text.match(/Placement:\s*(.*)/i);
//         // const budgetMatch = text.match(/Budget Suggestion:\s*(.*)/i);

//         // const headline = headlineMatch?.[1]?.trim() || "";
//         // const primaryText = primaryTextMatch?.[1]?.trim() || "";
//         // const description = descriptionMatch?.[1]?.trim() || "";
//         // const imagePrompt = imagePromptMatch?.[1]?.trim() || "";
//         // const targetAudience = audienceMatch?.[1]?.trim() || "";
//         // const targetAge = ageMatch?.[1]?.trim() || "";
//         // const targetGender = genderMatch?.[1]?.trim() || "";
//         // const interests = interestMatch?.[1]?.trim() || "";
//         // // const placement = placementMatch?.[1]?.trim() || "";
//         // const budget = budgetMatch?.[1]?.trim() || "";

//         // // console.log(text);
//         // // =========================
//         // // STEP 2: IMAGE GENERATION
//         // // =========================
//         // // const imageResponse = await ai.models.generateContent({
//         // //   model: "gemini-3.1-flash-image-preview",
//         // //   contents: imagePrompt,
//         // // });
//         // // // 👉 extract image
//         // // const imageBase64 =
//         // //   imageResponse?.candidates?.[0]?.content?.parts?.find(
//         // //     (p) => p.inlineData,
//         // //   )?.inlineData?.data;
//         // // const imageUrl = imageBase64
//         // //   ? `data:image/png;base64,${imageBase64}`
//         // //   : null;
//         // // console.log(imageUrl);
//         // // =========================
//         // // FINAL RESPONSE
//         // // =========================

//         // const variationRegex =
//         //   /Type:\s*(.*?)\nHeadline:\s*([\s\S]*?)\nPrimary Text:\s*([\s\S]*?)\nDescription:\s*([\s\S]*?)\nTarget Audience:\s*([\s\S]*?)\nTarget Age:\s*([\s\S]*?)\nTarget Gender:\s*([\s\S]*?)\nInterests:\s*([\s\S]*?)\nBudget Suggestion:\s*([\s\S]*?)(?=\n\d+\.|\n*$)/g;

//         // let variations = [];
//         // let match;
//         // while ((match = variationRegex.exec(text)) !== null) {
//         //   variations.push({
//         //     type: match[1].trim(),
//         //     headline: match[2].trim(),
//         //     primaryText: match[3].trim(),
//         //     description: match[4].trim(),
//         //     targetAudience: match[5].trim(),
//         //     targetAge: match[6].trim(),
//         //     targetGender: match[7].trim(),
//         //     interests: match[8].trim(),
//         //     budget: match[9].trim(),
//         //   });
//         // }

//         // res.send({
//         //   headline,
//         //   primaryText,
//         //   description,
//         //   targetAudience,
//         //   targetAge,
//         //   targetGender,
//         //   interests,
//         //   budget,
//         //   variations,
//         // });
//       } catch (err) {
//         console.log(err);
//         res.status(500).send({ error: "AI failed" });
//       }
//     });

//     app.post("/generate-variations", async (req, res) => {
//       try {
//         const { ad } = req.body;

//         const finalPrompt = getVariationPrompt(ad);

//         const response = await ai.models.generateContent({
//           model: "gemini-2.5-flash",
//           contents: finalPrompt,
//         });

//         const raw =
//           response.text ||
//           response?.candidates?.[0]?.content?.parts?.[0]?.text ||
//           "";

//         const cleaned = raw
//           .replace(/```json/g, "")
//           .replace(/```/g, "")
//           .trim();
//         // const variations = JSON.parse(cleaned);
//         // res.send({ variations });

//         const parsed = JSON.parse(cleaned);

//         const variations = Array.isArray(parsed)
//           ? parsed
//           : parsed.variations || [];

//         res.send({ variations });
//       } catch (err) {
//         console.log(err);
//         res.status(500).send({
//           error: "Variation generation failed",
//         });
//       }
//     });

//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!",
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// const port = process.env.PORT || 5000;
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });








require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
const { MongoClient, ServerApiVersion } = require("mongodb");
const {
  getPrompt,
  getFacebookPrompt,
  getVariationPrompt,
  getCompetitorUrlPrompt,
  getCompetitorCopyPrompt,
} = require("./prompt");

const { extractCode, extractAnalysis, extractIntent } = require("./aiHelper");

const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/* =========================
   SAFE UTILITIES
========================= */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const safeJSON = (text) => {
  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (e) {
    return null;
  }
};

/* =========================
   URL TYPE DETECTION
========================= */
const detectUrlType = (url) => {
  if (!url) return "unknown";

  if (url.includes("facebook.com/ads/library")) {
    return "fb_ads_library";
  }

  if (url.startsWith("http")) {
    return "landing_page";
  }

  return "unknown";
};

/* =========================
   LANDING PAGE SCRAPER
========================= */
const scrapeLandingPage = async (url) => {
  try {
    const { data } = await axios.get(url, {
      timeout: 15000,
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(data);

    return {
      type: "landing",
      title: $("title").text().trim(),
      description:
        $('meta[name="description"]').attr("content") || "",
      headings: $("h1, h2, h3")
        .map((i, el) => $(el).text().trim())
        .get()
        .slice(0, 12),
      body: $("p")
        .map((i, el) => $(el).text().trim())
        .get()
        .filter((t) => t.length > 40)
        .slice(0, 12),
    };
  } catch (err) {
    return {
      type: "landing",
      error: true,
      url,
    };
  }
};

/* =========================
   FACEBOOK ADS SCRAPER (ROBUST)
========================= */
const scrapeFacebookAds = async (url) => {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    );

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });

    await sleep(3000);

    const data = await page.evaluate(() => {
      return {
        text: document.body.innerText,
        title: document.title,
      };
    });

    return {
      type: "facebook_ads",
      rawText: (data.text || "").slice(0, 10000),
      title: data.title || "",
    };
  } catch (err) {
    return null;
  } finally {
    if (browser) await browser.close();
  }
};

/* =========================
   FALLBACK ENGINE
========================= */
const fallbackAnalyze = (url) => ({
  type: "fallback",
  url,
});

/* =========================
   HYBRID SCRAPER ENGINE
========================= */
const getScrapedData = async (url) => {
  const type = detectUrlType(url);

  if (type === "landing_page") {
    return await scrapeLandingPage(url);
  }

  if (type === "fb_ads_library") {
    const fb = await scrapeFacebookAds(url);

    if (fb && fb.rawText) return fb;

    return {
      type: "facebook_ads_fallback",
      rawText: `Facebook Ads Library URL: ${url}`,
    };
  }

  return fallbackAnalyze(url);
};

/* =========================
   MONGODB SETUP
========================= */
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/* =========================
   MAIN SERVER LOGIC
========================= */
async function run() {
  try {
    await client.connect();

    /* =========================
       GENERATE NORMAL ADS
    ========================= */
    app.post("/generate", async (req, res) => {
      try {
        const { prompt } = req.body;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: getPrompt(prompt),
        });

        const text =
          response.text ||
          response?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "";

        const intent = extractIntent(text);
        const { score, analysis } = extractAnalysis(text);
        const html = extractCode(text);

        res.send({ html, intent, score, analysis });
      } catch (err) {
        res.status(500).send({ error: "AI failed" });
      }
    });

    /* =========================
       FACEBOOK ADS (MAIN SYSTEM)
    ========================= */
    app.post("/facebook-ads", async (req, res) => {
      try {
        const { prompt, mode } = req.body;

        let textPrompt;

        if (mode === "link") {
          const scrapedData = await getScrapedData(prompt);

          textPrompt = getCompetitorUrlPrompt(scrapedData);
        } else if (mode === "addCopy") {
          textPrompt = getCompetitorCopyPrompt(prompt);
        } else {
          textPrompt = getFacebookPrompt(prompt);
        }

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: textPrompt,
        });

        const raw =
          response.text ||
          response?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "";

        const data = safeJSON(raw);

        if (!data) {
          return res.status(200).send({
            primaryText: "",
            headline: "",
            description: "",
            targetAudience: "",
            targetAge: "",
            targetGender: "",
            interests: "",
            budgetSuggestion: "",
            imagePrompt: "",
          });
        }

        res.send(data);
      } catch (err) {
        res.status(500).send({ error: "AI failed" });
      }
    });

    /* =========================
       VARIATIONS
    ========================= */
    app.post("/generate-variations", async (req, res) => {
      try {
        const { ad } = req.body;
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: getVariationPrompt(ad),
        });

        const parsed = safeJSON(response.text || "");

        const variations = Array.isArray(parsed)
          ? parsed
          : parsed?.variations || [];

        res.send({ variations });
      } catch (err) {
        res.status(500).send({
          error: "Variation generation failed",
        });
      }
    });

    await client.db("admin").command({ ping: 1 });

    console.log("🚀 Server + DB connected successfully");
  } finally {
    // keep alive
  }
}

run().catch(console.dir);

/* =========================
   SERVER START
========================= */
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});