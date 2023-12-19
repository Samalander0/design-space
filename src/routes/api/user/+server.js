import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { json } from '@sveltejs/kit';
import { GOOGLE_API_KEY } from '$env/static/private'

const MODEL_NAME = "gemini-pro";
const API_KEY = GOOGLE_API_KEY;

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

// Prompt
function prompt() {
  const parts = [
    {text: "prompt: Generate extremely descriptive and interesting user need statements. Good user need statements follow the framework of [name],  [user description] needs [need] in order to/so that/because [goal/insight]. Good user need statements should also be generative and not hint at a specific solution. Good user need statements also are longer and descriptive, while giving detailed information on who the user personally and what their needs are. Below are some examples of good user need statements.\n\nexamples:\n* Sugata, a desperate parent living in a remote village, needs the means to give her premature baby a way to survive because modern healthcare options are unaffordable and more than 4-hours away.\n* Vanessa, harried mother of three, rushing through the airport only to wait hours at the gate, needs to entertain her playful children because “annoying little brats” only irritate already frustrated fellow passengers.\n* Kimberly, a frequent traveler who loves exploring new places around the world, needs a way to find and book local experiences so that she can immerse herself in the culture and avoid tourist traps.\n* Lila, a working mother who has a hectic schedule and two kids, needs a way to relax and unwind so that she can be less stressed and burned out.\n* Soham, a gamer who enjoys playing online games, needs a way to find and join a community of like-minded players in order to have fun and make new friends.\n* Ravi, a language learner who wants to learn Spanish, needs a way to practice his speaking and listening skills because he wants to communicate fluently and confidently with native speakers and travel to Spanish-speaking countries.\n* Ella, a pet owner who has a dog and a cat, needs a way to monitor and care for her pets when she is away from home because she worries about their safety and well-being and wants to keep them happy and healthy.\n\nuser need statements:\n* Nora, a graphic designer who works from home, needs a way to organize and prioritize her projects because she has multiple deadlines and clients to juggle and often feels overwhelmed and stressed.\n"},
  ];
  return(parts)
}

export async function GET({ url }) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  let parts = prompt()
  
  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  let response = result.response.text();
  response = response.split("*") // Split the response into the individual sections
  response.shift() // Remove the first item, since it will be a blank character

  return json(response)
}