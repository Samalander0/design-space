import { TextServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";
import { json } from '@sveltejs/kit';
import { GOOGLE_API_KEY } from '$env/static/private'

const MODEL_NAME = "models/text-bison-001";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(GOOGLE_API_KEY),
});

// Prompt
function prompt() {
  const promptString = `prompt: Generate extremely descriptive and interesting user need statements. Good user need statements follow the framework of [name],  [user description] needs [need] in order to/so that/because [goal/insight]. Good user need statements should also be generative and not hint at a specific solution. Good user need statements also are longer and descriptive, while giving detailed information on who the user personally and what their needs are. Below are some examples of good user need statements.

examples:
* Sugata, a desperate parent living in a remote village, needs the means to give her premature baby a way to survive because modern healthcare options are unaffordable and more than 4-hours away.
* Vanessa, harried mother of three, rushing through the airport only to wait hours at the gate, needs to entertain her playful children because “annoying little brats” only irritate already frustrated fellow passengers.
* Kimberly, a frequent traveler who loves exploring new places around the world, needs a way to find and book local experiences so that she can immerse herself in the culture and avoid tourist traps.
* Lila, a working mother who has a hectic schedule and two kids, needs a way to relax and unwind so that she can be less stressed and burned out.
* Soham, a gamer who enjoys playing online games, needs a way to find and join a community of like-minded players in order to have fun and make new friends.
* Ravi, a language learner who wants to learn Spanish, needs a way to practice his speaking and listening skills because he wants to communicate fluently and confidently with native speakers and travel to Spanish-speaking countries.
* Ella, a pet owner who has a dog and a cat, needs a way to monitor and care for her pets when she is away from home because she worries about their safety and well-being and wants to keep them happy and healthy.

user need statements:
* Nora, a graphic designer who works from home, needs a way to organize and prioritize her projects because she has multiple deadlines and clients to juggle and often feels overwhelmed and stressed.
`;
  return(promptString)
}
const stopSequences = [];

export async function GET({ url }) {
  let generation = "";
  let generationPrompt = prompt()
  
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