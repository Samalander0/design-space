import { TextServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";
import { json } from '@sveltejs/kit';
import { GOOGLE_API_KEY } from '$env/static/private'

const MODEL_NAME = "models/text-bison-001";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(GOOGLE_API_KEY),
});

// Prompt
function prompt(user) {
  const promptString = `Good interview questions should be personal, revealing, creative, and interesting. Questions also must follow the provided question topic. This means when a question is asked, we should learn information based on the question topic about the user. Each listed question should work by itself. If a question has a follow-up question, include it after the original one on the same line. Below are some examples of interview questions:
  user: a science teacher who teaches virtually. question topic: their role
  questions: * How do you create a sense of community and belonging for your students who are learning remotely? 
  * How do you assess student progress and provide feedback in an online environment?
  * How do you collaborate and communicate with other teachers, students, parents, and administrators in an online setting?
  * What are your responsibilities as a virtual teacher and how do they differ from the responsibilities of an in-person teacher?
  * How do you differentiate instruction and accommodate diverse learning needs and styles in your online science classes?
  user: a abstract artist. question topic: their background
  questions: * How has your cultural background influenced your abstract art?
  * What inspired your interest in abstract art and why?
  * Who are some of the abstract artists that influenced or inspired you?
  * How do you deal with criticism or feedback on your abstract art?
  * What is your earliest memory of being drawn to art and how does that influence your art today?
  * What emotions or messages do you want to convey through your abstract art?
  * How do you cope with creative blocks or challenges?
  user: a taxi driver who struggles to get reliable business. question topic: their joys
  questions: * How do you keep yourself motivated and passionate about your job?
  * Can you tell me about a moment as a taxi driver where you felt like the job was a perfect fit for you?
  * How do you network and communicate with other taxi drivers or organizations in your industry?
  * How has your experience as a taxi driver changed your perspective on life?
  * What motivated you to become a taxi driver in the first place?
  * What are some of the skills or qualities that you have developed or improved as a taxi driver?
  user: a marine scientist who specializes in habitat restoration. question topic: their challenges
  questions: * How do you select the most suitable restoration methods or techniques for different habitats or situations? What are the advantages and disadvantages of each method or technique?
  * What are the main goals and objectives of your habitat restoration projects? How do you measure and evaluate their success?
  * What are the main drivers and impacts of marine habitat degradation or loss in your region or area of interest?
  * How do you deal with the challenges of working in a field that is constantly changing? 
  * What are some of the most important lessons you have learned from your work?
  * How do you balance the ecological, social, and economic benefits and costs of your habitat restoration projects? How do you communicate the value and importance of your work to different audiences?
  user: a freelance graphic designer who used a web-based tool called "Canva". question topic: their needs
  questions: * What are the main reasons you use this Canva for your graphic design projects?
  * How often do you use Canva and for how long per session?
  * How do you share or export your designs? What are the formats or platforms that you prefer or need?
  * How do you compare this Canva with other graphic design tools that you have used or are aware of?
  * What are some of the improvements or suggestions that you have for Canva? What are some of the features or functions that you would like to see added or changed?

  user: ${user}
  questions:`;
  return(promptString)
}
const stopSequences = [];

export async function GET({ url }) {
  let generation = "";
  let generationPrompt = prompt(url.searchParams.get('prompt'))
  
  generation = await client.generateText({
    model: MODEL_NAME,
    temperature: 0.7,
    candidateCount: 1,
    top_k: 40,
    top_p: 0.95,
    max_output_tokens: 10,
    stop_sequences: stopSequences,
    safety_settings: [{"category":"HARM_CATEGORY_DEROGATORY","threshold":1},{"category":"HARM_CATEGORY_TOXICITY","threshold":1},{"category":"HARM_CATEGORY_VIOLENCE","threshold":2},{"category":"HARM_CATEGORY_SEXUAL","threshold":2},{"category":"HARM_CATEGORY_MEDICAL","threshold":2},{"category":"HARM_CATEGORY_DANGEROUS","threshold":2}],
    prompt: {
      text: generationPrompt,
    },
  })

  let response = generation[0].candidates[0].output
  response = response.split("*") // Split the response into the individual sections
  response.shift() // Remove the first item, since it will be a blank character

  return json(response)
}