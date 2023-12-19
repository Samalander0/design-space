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
    {text: " Good interview questions should be personal, revealing, creative, and interesting. Questions also must follow the provided question topic. This means when a question is asked, we should learn information based on the question topic about the user. Each listed question should work by itself. If a question has a follow-up question, include it after the original one on the same line. Below are some examples of interview questions:"},
    {text: "user: a science teacher who teaches virtually. question topic: their role"},
    {text: "questions: * How do you create a sense of community and belonging for your students who are learning remotely? \n* How do you assess student progress and provide feedback in an online environment?\n* How do you collaborate and communicate with other teachers, students, parents, and administrators in an online setting?\n* What are your responsibilities as a virtual teacher and how do they differ from the responsibilities of an in-person teacher?\n* How do you differentiate instruction and accommodate diverse learning needs and styles in your online science classes?"},
    {text: "user: a abstract artist. question topic: their background"},
    {text: "questions: * How has your cultural background influenced your abstract art?\n* What inspired your interest in abstract art and why?\n* Who are some of the abstract artists that influenced or inspired you?\n* How do you deal with criticism or feedback on your abstract art?\n* What is your earliest memory of being drawn to art and how does that influence your art today?\n* What emotions or messages do you want to convey through your abstract art?\n* How do you cope with creative blocks or challenges?"},
    {text: "user: a taxi driver who struggles to get reliable business. question topic: their joys"},
    {text: "questions: * How do you keep yourself motivated and passionate about your job?\n* Can you tell me about a moment as a taxi driver where you felt like the job was a perfect fit for you?\n* How do you network and communicate with other taxi drivers or organizations in your industry?\n* How has your experience as a taxi driver changed your perspective on life?\n* What motivated you to become a taxi driver in the first place?\n* What are some of the skills or qualities that you have developed or improved as a taxi driver?"},
    {text: "user: a marine scientist who specializes in habitat restoration. question topic: their challenges"},
    {text: "questions: * How do you select the most suitable restoration methods or techniques for different habitats or situations? What are the advantages and disadvantages of each method or technique?\n* What are the main goals and objectives of your habitat restoration projects? How do you measure and evaluate their success?\n* What are the main drivers and impacts of marine habitat degradation or loss in your region or area of interest?\n* How do you deal with the challenges of working in a field that is constantly changing? \n* What are some of the most important lessons you have learned from your work?\n* How do you balance the ecological, social, and economic benefits and costs of your habitat restoration projects? How do you communicate the value and importance of your work to different audiences?"},
    {text: "user: a freelance graphic designer who used a web-based tool called \"Canva\". question topic: their needs"},
    {text: "questions: * What are the main reasons you use this Canva for your graphic design projects?\n* How often do you use Canva and for how long per session?\n* How do you share or export your designs? What are the formats or platforms that you prefer or need?\n* How do you compare this Canva with other graphic design tools that you have used or are aware of?\n* What are some of the improvements or suggestions that you have for Canva? What are some of the features or functions that you would like to see added or changed?"},
    {text: `user: ${user}`},
    {text: "questions: "},
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