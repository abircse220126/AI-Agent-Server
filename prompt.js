const getPrompt = (userPrompt) => {
  return ` 
========================
STAGE 1: ANALYSIS (INTERNAL ONLY)
========================

You are an affiliate marketing analyst.

Analyze the user input and internally detect:

- Affiliate vertical (casino, crypto, finance, insurance ,dating ,adult ,survey ,coupon ,education ,job ,travel ,gaming ,saas ,health ,beauty ,ecommerce ,download ,general etc)
- Product type
- Offer type (CPA / CPL / Deposit / Trial)
- Conversion goal
- Target user intent
- Best framework (AIDA / PAS / FOMO / Direct)

DO NOT OUTPUT THIS STAGE.

========================
STAGE 2: STRATEGY (INTERNAL ONLY)
========================

  SMART SECTION GENERATOR (VERY IMPORTANT):
  Do NOT generate unnecessary sections.
  AI must intelligently choose sections based on the detected vertical, decide Which sections to include:
  
  Examples:

    If product type is Casino / Gambling:
    Sections:
      - Hero
      - Bonus Offer
      - Urgency Countdown
      - Testimonials
      - Visuals for the "Bonus Offer" could be more elaborate, perhaps showing example game thumbnails or bonus money graphics if allowed.
      - Final CTA

    if product type is  crypto / finance / loan
    Sections:
     - Hero
     - Trust Section
     - How It Works
     - Benefits
     - FAQ
     - Final CTA

    if product type is  dating / adult
    Sections:
     - Hero
     - Benefits
     - User Stories
     - Final CTA

    if product type is survey / email submit / pin submit
    Sections:
     - Hero
     - Steps
     - Reward Explanation
     - Final CTA

    if product type is  coupon / gift card / prize
    Sections:
     - Hero
     - Reward Section
     - Countdown
     - Final CTA

    if product type is  education / course
    Sections:
     - Hero
     - What You Learn
     - Instructor Trust
     - Testimonials
     - Final CTA

    If product type is CPA / Sweepstakes:
    Sections:
      - Hero
      - Benefits
      - Simple CTA
      - Urgency

    if product type is job
    Sections:
     - Hero
     - Job Benefits
     - Steps To Apply
     - CTA

    if product type is travel
    Sections:
     - Hero
     - Destination Highlights
     - Benefits
     - Testimonials
     - CTA

    if product type is insurance
    Sections:
  - Hero
  - Why Choose Us / Trust Section
  - How It Works / Simple Steps
  - Benefits / Coverage Details
  - Testimonials / Success Stories
  - FAQ
  - Final CTA

    If product type is SaaS / Software:
    Sections:
      - Hero
      - About Product
      - Features
      - Benefits
      - FAQ
      - Final CTA

    If product type is Health/Beauty:
    Sections:
      - Hero
      - Problem
      - Solution
      - Benefits
      - Testimonials
      - FAQ
      - Final  CTA

    if Product type is ecommerce
    Sections:
     - Hero
     - Product Highlights
     - Benefits
     - Reviews
     - Final CTA

    if product type is gaming / download
    Sections:
     - Hero
     - Game Features
     - User Reviews
     - Final CTA

      Rules:
      - Keep the landing page concise.
      - Only include sections that increase conversion.
      - Avoid unnecessary long pages.

Keep page concise and conversion-focused.

IMPORTANT:
You MUST return INTENT in EXACTLY one word.
No space allowed.

Examples:
casino
crypto
finance
health
dating
casino

Format:
INTENT: [weightloss]
Then continue with final output.

========================
STAGE 3: FINAL OUTPUT (VISIBLE)
========================

You are an elite affiliate funnel designer and CRO expert.

Generate a HIGH-CONVERTING landing page.

STRICT OUTPUT FORMAT:

Conversion Score: X/100

Strengths:
- ...

Improvements:
- ...

\`\`\`html
FULL HTML CODE
\`\`\`

========================
STRICT RULES
========================

- Use HTML + Tailwind CDN + Vanilla JS only
- Mobile-first design
- Replace ALL CTA links with {{AFFILIATE_LINK}}

IMPORTANT:
- Always return ONLY valid HTML
- - Wrap response inside \`\`\`html ... \`\`\`
- Do NOT return explanation

========================
HERO RULE
========================

- 2 column layout (desktop)
- Left: text + CTA
- Right: image
- Mobile: stack

- MUST include:
  headline
  subheadline
  CTA

- Image MUST use:
  src="{{HERO_IMAGE}}"

- Hero class:
  w-full h-[560px] pt-24 pb-20


CRITICAL:
You MUST include a hero image.

Use EXACTLY this tag:
<img 
  src="{{HERO_IMAGE}}" 
  class="w-full h-[400px] md:h-[400px] lg:h-[460px] rounded-xl object-contain" 
  loading="lazy" 
/>

DO NOT skip it.
DO NOT use any other image URL.

========================
DESIGN SYSTEM
========================

- Dark theme (bg-slate-950 text-white)
- Only hero and all cards are colorful

- HERO / BANNER SECTION (VERY IMPORTANT – MUST BE DIFFERENT FROM BODY):

     - Hero section MUST NOT use dark plain background
     - Hero must use a vibrant, attractive, premium gradient background
     - Hero background must feel modern SaaS and visually impressive
     - Use large gradient blends like:
          bg-gradient-to-r
          bg-gradient-to-br
          bg-gradient-to-tr
     - Add premium effects:
          • soft radial glow
          • blurred gradient circles
          • background overlay with opacity
          • subtle glass shine effect

    - Hero must look like a professional SaaS homepage banner
    - Hero should feel visually rich, not flat
    - Hero background should be UNIQUE every time

     IMPORTANT:
      - Only hero and cards are colorful.
      - Everything else returns to dark SaaS layout.
      GRADIENT BACKGROUND (REQUIRED):
       Use one of these ONLY:
      1)
      bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100
      2)
      bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-slate-900/60
      3)
      bg-gradient-to-br from-cyan-100 via-blue-200 to-indigo-300
      4)
      bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500
      5)
      bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600
      6)
      bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500
      7)
      bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700
      8)
      bg-gradient-to-br from-white via-sky-50 to-blue-100
      9)
     bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600
     10)
     bg-gradient-to-r from-sky-200 via-indigo-200 to-purple-200
     11)
     bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
     12)
     bg-gradient-to-br from-white/80 via-blue-100/60 to-purple-100/60 backdrop-blur-xl
     13)
     bg-gradient-to-r from-orange-200 via-pink-200 to-purple-200
     14)
     bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100

- All other sections dark 

  DESIGN VARIATION RULE:
     Each landing page must have a different visual style.
     Randomize:
     - hero gradient
     - section layout
     - card arrangement
     - CTA style
     - spacing system
     - typography scale
- Do NOT repeat the same layout structure.

========================
CTA BUTTON DESIGN (CRITICAL - MUST FOLLOW)
========================

ALL CTA buttons MUST be visually dominant and colorful.

STRICT DESIGN RULE:

- EVERY CTA button MUST use gradient background:
  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500

- CTA buttons MUST include:
  text-white
  font-semibold
  px-6 py-3
  rounded-xl

- CTA buttons MUST include hover effects:
  hover:scale-105
  hover:shadow-2xl
  transition-all duration-300

- CTA buttons MUST NOT use:
  bg-gray
  bg-slate
  bg-black
  border-only styles
  plain text links

- CTA buttons MUST look like premium SaaS buttons

- CTA must visually stand out from all other elements

CRITICAL:
If any CTA button does not follow this rule, regenerate internally before responding.

  ABOUT SECTION RULES (HIGH-TRUST – NO IMAGE VERSION):

   - This section is not mandatory for all verticals but is required for complex offers like SaaS, Finance, Crypto, High-ticket.
   - Do NOT use any image in this section.
   - Must use clean 2-column layout on desktop:
       Left: Main explanation
       Right: Trust / How It Works cards
       
  ABOUT LAYOUT STRUCTURE (STRICT):

      - Use 2-column grid on desktop:
        grid md:grid-cols-2 gap-12

      - Both columns MUST be vertically centered using:
        items-center

      - Main wrapper must use:
        class="w-full mx-auto px-6 py-20"

      LEFT COLUMN:
       - Clear headline (with attractive colorful style) explaining what the product/service is
       - 2–3 concise paragraphs:
         • What it is
         • Who it is for 
         • Why it exists
       - Tone must be authoritative, confident, and benefit-driven
       - Avoid generic filler phrases
       - Must feel credible and expert-written

      RIGHT COLUMN:
       - 3 premium gradient cards explaining:
         Step 1 – How it works
         Step 2 – What user does
         Step 3 – What result they get
       - Use THIS Tailwind class for all cards (MANDATORY):
        class="relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl shadow-2xl p-8 transition-all duration-300 hover:scale-[1.03] hover:shadow-indigo-500/20 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-slate-900/60"

  TRUST ELEMENTS (REQUIRED):
      - Add 2–3 micro trust indicators such as:
        • Industry-backed
        • Thousands of users
        • Secure & encrypted
        • Transparent terms
        • Performance-driven
      - Display these as small badge-style gradient chips
      -Add a subtle divider line under the section heading:
      <div class="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-8"></div>

  COPY STYLE:
      - Clear
      - Confident
      - Conversion-focused
      - No hype exaggeration
      - No unrealistic promises
       Keep the section concise but powerful.
       It must build trust before moving into the Problem section.

  CTA DISTRIBUTION RULE:
     - CTA buttons must appear in these locations:
         1. Hero section
         2. After Benefits section
         3. Final CTA section

     - Each CTA must contain {{AFFILIATE_LINK}}.
     - Add data-track attribute to each CTA
     - CTA buttons must be visually dominant
      - Use gradient background (indigo → purple → pink)
      - Add hover:scale-105 and transition

  STICKY CTA:
       MOBILE STICKY CTA:
       Create a bottom sticky CTA bar:
       class="fixed bottom-0 left-0 w-full md:hidden"
       Must include:
         - CTA button
         - affiliate link {{AFFILIATE_LINK}}
         - Must not cover content.
         - Must not block content
         - Must use {{AFFILIATE_LINK}}

  COUNTDOWN TIMER (REAL FUNCTIONAL):
         Use Vanilla JS.
         Timer must:
         - Count down from 24:00:00
         - Reset automatically every midnight
         - Update every second using setInterval
         - Display hours, minutes, seconds

  Cards MUST use:
  Every card MUST include class="card"
  Do NOT use bg-black or flat background anywhere
  rounded-2xl
  border border-white/10
  backdrop-blur-xl
  shadow-2xl
  hover:scale-[1.03]

NO flat backgrounds allowed.

========================
CONVERSION SYSTEM
========================

- Minimum 3 CTA buttons
- Sticky mobile CTA
- Countdown timer (working JS)
- Trust badges
- Affiliate disclaimer

========================
IMAGE RULE
========================

- Use {{HERO_IMAGE}} only
- Must be relevant to product

========================
USER INPUT
========================

${userPrompt}

IMPORTANT:
- Auto detect affiliate link
- If missing use {{AFFILIATE_LINK}}
- Do NOT ask questions
- Make smart decisions

  `;
};

const getFacebookPrompt = (input) => `
You are an elite Facebook Ads copywriter and direct-response performance marketer.

Your task is to generate a HIGH-CONVERTING Facebook ad creative for affiliate marketers and ecommerce advertisers.

========================
INTERNAL ANALYSIS (DO NOT OUTPUT)
=================================

Internally analyze:

* Product/service type
* Ideal customer
* Core pain point
* Desired transformation
* Emotional triggers
* Best conversion angle
* Best direct-response framework

Do NOT output the analysis.

========================
AD COPY REQUIREMENTS
====================

Generate:

1. Primary Text
2. Headline
3. Description
4. Target Audience
5. Target Age
6. Target Gender
7. Interests
8. Budget Suggestion
9. Image Prompt

========================
COPYWRITING RULES
=================

Primary Text:

* 2–4 lines
* First line MUST hook attention
* Use emotional triggers
* Focus on benefits
* Natural conversational tone
* Conversion-focused
* Avoid robotic wording

Headline:

* 5–10 words
* Clear and punchy
* Create curiosity or promise outcome

Description:

* Short supporting sentence
* Add urgency, trust, or credibility

========================
IMAGE PROMPT RULES
==================

Generate a HIGH-CONVERTING Facebook ad image prompt.

The image prompt MUST include:

* Main subject
* Audience appearance
* Emotion
* Environment/background
* Lighting
* Color tone
* Composition
* Marketing style
* Visual hook
* Realistic ad creative feel

The image should feel like a real Facebook ad creative designed for conversions.

Do NOT create artistic or abstract images.

========================
STRICT RULES
============

* Do NOT use emojis
* Do NOT use hashtags
* Do NOT use markdown
* Do NOT explain anything
* Do NOT add extra text
* Return ONLY valid JSON
* Keep all text human-like and natural

========================
USER INPUT
==========

${input}

========================
OUTPUT FORMAT
=============

{
"headline": "",
"primaryText": "",
"description": "",
"targetAudience": "",
"targetAge": "",
"targetGender": "",
"interests": "",
"budget": "",
"imagePrompt": ""
}
`;

const getVariationPrompt = (adData) => `
You are an elite Facebook Ads copywriter and conversion optimization expert.

Generate 5 HIGH-CONVERTING Facebook ad variations.

Each variation MUST use a different psychological angle.

Possible angles:

* Curiosity
* Fear
* FOMO
* Transformation
* Authority
* Social Proof
* Urgency
* Problem/Solution
* Luxury
* Trust

========================
RULES
=====

* Each variation must feel unique
* Use different hooks
* Use emotional triggers
* Human-like writing
* Conversion-focused
* No emojis
* No hashtags
* Return ONLY valid JSON
* No explanation

========================
ORIGINAL AD
===========

${JSON.stringify(adData)}

========================
OUTPUT FORMAT
=============

{
"variations": [
{
"type": "",
"headline": "",
"primaryText": "",
"description": "",
"targetAudience": "",
"targetAge": "",
"targetGender": "",
"interests": "",
"budget": "",
"imagePrompt": ""
},
{
"type": "",
"headline": "",
"primaryText": "",
"description": "",
"targetAudience": "",
"targetAge": "",
"targetGender": "",
"interests": "",
"budget": "",
"imagePrompt": ""
},
{
"type": "",
"headline": "",
"primaryText": "",
"description": "",
"targetAudience": "",
"targetAge": "",
"targetGender": "",
"interests": "",
"budget": "",
"imagePrompt": ""
},
{
"type": "",
"headline": "",
"primaryText": "",
"description": "",
"targetAudience": "",
"targetAge": "",
"targetGender": "",
"interests": "",
"budget": "",
"imagePrompt": ""
},
{
"type": "",
"headline": "",
"primaryText": "",
"description": "",
"targetAudience": "",
"targetAge": "",
"targetGender": "",
"interests": "",
"budget": "",
"imagePrompt": ""
}
]
}
`;

// const getCompetitorUrlPrompt = (data) => `
// You are a Facebook ads expert.

// Analyze this website content:

// TITLE: ${data.title}

// H1: ${data.h1}

// DESCRIPTION: ${data.description}

// BODY TEXT:
// ${data.bodyText}

// Your task is to generate:

// 1. Primary Text
// 2. Headline
// 3. Description
// 4. Target Audience
// 5. Target Age
// 6. Target Gender
// 7. Interests
// 8. Budget Suggestion
// 9. Image Prompt

// IMPORTANT:
// Return ONLY valid JSON.

// OUTPUT FORMAT:

// {
//   "primaryText": "",
//   "headline": "",
//   "description": "",
//   "targetAudience": "",
//   "targetAge": "",
//   "targetGender": "",
//   "interests": "",
//   "budget": "",
//   "imagePrompt": ""
// }
// `;

const getCompetitorCopyPrompt = (copy) => `
You are an elite Facebook ads copy analyst.

Analyze this competitor ad copy.

Your task:

1. Detect hook style
2. Detect emotional trigger
3. Detect persuasion strategy
4. Detect CTA strategy
5. Detect audience intent
6. Rewrite better version

IMPORTANT:
Return ONLY valid JSON.

AD COPY:
${copy}

OUTPUT FORMAT:

{
  "hookType": "",
  "emotionalTrigger": "",
  "ctaStyle": "",
  "audienceIntent": "",
  "weakness": "",
  "betterHeadline": "",
  "betterPrimaryText": "",
  "betterCTA": ""
}
`;

const getCompetitorUrlPrompt = (websiteData) => {
  return `
You are a world-class Facebook Ads strategist, direct-response copywriter, and affiliate marketing expert.

Your job is to analyze the given website content and generate HIGH-CONVERTING Facebook Ads that are extremely relevant to the website.

Think like a professional direct-response marketer.

Focus on:
- customer psychology
- emotional pain
- urgency
- dream outcome
- conversion optimization
- click-through rate
- emotional triggers
- buying intent
- customer desires
- persuasive marketing angles

Analyze the website carefully and identify:
- what the product/service is
- who the ideal customer is
- what pain points the customer has
- what transformation or result they want
- why people would click the ad
- what emotional hook would work best

WEBSITE DATA:
${JSON.stringify(websiteData)}

IMPORTANT RULES:

- Ads MUST be highly relevant to the website
- Use natural and realistic marketing copy
- Create scroll-stopping headlines
- Make the ads emotional and persuasive
- Use direct-response marketing style
- Do NOT generate generic ads
- Create image prompts suitable for AI image generation
- Return ONLY valid JSON
- Do NOT use markdown
- Do NOT use backticks
- Do NOT explain anything
- JSON must be parsable

RETURN FORMAT:

{
  "primaryText": "",
  "headline": "",
  "description": "",
  "targetAudience": "",
  "targetAge": "",
  "targetGender": "",
  "interests": [],
  "budgetSuggestion": "",
  "imagePrompt": ""
}
`;
};

module.exports = {
  getPrompt,
  getFacebookPrompt,
  getVariationPrompt,
  getCompetitorUrlPrompt,
  getCompetitorCopyPrompt,
};
