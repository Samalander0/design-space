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
function prompt(user) {
  const parts = [
    {text: " Good How Might We questions are properly scoped. How Might We questions should lead to many answers instead of a specific solution. \n\nHere is a user need statement: Harried mother of three, rushing through the airport only to wait hours at the gate, needs to entertain her playful children because “annoying little brats” only irritate already frustrated fellow passengers.\nHere are some strategies that you can use and examples: Amp up the good: HMW use the kids’ energy to entertain fellow passenger?\nRemove the bad: HMW separate the kids from fellow passengers?\nExplore the opposite: HMW make the wait the most exciting part of the trip?\nQuestion an assumption: HMW entirely remove the wait time at the airport?\nGo after adjectives: HMW we make the rush refreshing instead of harrying?\nID unexpected resources: HMW leverage free time of fellow passengers to share the loa ?\nCreate an analogy from need or context: HMW make the airport like a spa? Like a playground?\nPlay POV against the challenge: HMW make the airport a place that kids want to go?\nChange a status quo: HMW make playful, loud kids less annoying?\nBreak POV into pieces: HMW entertain kids? HMW slow a mom down? HMW mollify delayed passengers?\n\nBelow are some examples of good How Might We questions."},
    {text: "user need statement: Sugata, a desperate parent living in a remote village needs the means to give her premature baby a way to survive because modern healthcare options are unaffordable and more than 4-hours away"},
    {text: "how might we questions: * How might we make modern healthcare more affordable for Sugata?\n* How might we bring modern healthcare options closer to Sugata?\n* How might we replace current modern healthcare options to be more accessible to Sugata?\n* How might we reduce the amount of babies that are born prematurely?"},
    {text: "user need statement: John, a retiree who is looking for a new hobby, needs a way to meet new people and learn new things because he is bored and wants to stay active and engaged."},
    {text: "how might we questions: * How might we channel John's boredom into a productive and fun activity?\n* How might we find alternate ways of staying active and engaged for John?\n* How might we get John back into working at a more fun and engaging job?\n* How might we foster John’s social connections and interactions through his hobbies?\n* How might we create opportunities for John to learn new things and challenge himself in a fun and supportive environment?"},
    {text: `user need statement: ${user}`},
    {text: "how might we questions: "},
  ];
  return(parts)
}

export async function GET({ url }) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  let parts = prompt(url.searchParams.get('prompt'))
  
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