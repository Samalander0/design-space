import { TextServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";
import { json } from '@sveltejs/kit';
import { GOOGLE_API_KEY } from '$env/static/private'

const MODEL_NAME = "models/text-bison-001";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(GOOGLE_API_KEY),
});

// Prompt
function prompt(userneedstatement) {
  const promptString = `Good How Might We questions are properly scoped. How Might We questions should lead to many answers instead of a specific solution. Below are some examples of good How Might We questions.
user need statement: Sugata, a desperate parent living in a remote village needs the means to give her premature baby a way to survive because modern healthcare options are unaffordable and more than 4-hours away
how might we questions: * How might we make modern healthcare more affordable for Sugata?
* How might we bring modern healthcare options closer to Sugata?
* How might we replace current modern healthcare options to be more accessible to Sugata?
* How might we reduce the amount of babies that are born prematurely?
user need statement: Harried mother of three, rushing through the airport only to wait hours at the gate, needs to entertain her playful children because “annoying little brats” only irritate already frustrated fellow passengers.
how might we questions: * How might we provide harried mothers of three with engaging and fun activities for their children at the airport gate?
* How might we empower harried mothers of three to manage their children’s energy and behavior at the airport gate?
* How might we leverage the airport resources and facilities to entertain harried mothers of three and their children at the airport gate?
* How might we create a way for children to exert their playfulness in a way that doesn't irritate fellow passengers?
* How might we reduce the wait time at the airport so children of harried mothers don't have to wait so long?
user need statement: ${userneedstatement}
how might we questions:`;
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