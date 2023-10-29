import { TextServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";
import { json } from '@sveltejs/kit';
import { GOOGLE_API_KEY } from '$env/static/private'

const MODEL_NAME = "models/text-bison-001";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(GOOGLE_API_KEY),
});

// Prompt
function prompt(idea) {
  const promptString = `I have an idea. I want you to give me feedback on the idea, constructive criticism, feedback on how novel it is (tell me if it already exists, and give specifics), tips on how to do it, and let me know of any ethical implications it might have (if any). Try to keep your response shorter and concise. Here is the idea: ${idea}`;
  return(promptString)
}
const stopSequences = [];

export async function GET({ url }) {
  let generation = "";
  let generationPrompt = prompt(url.searchParams.get('idea'))
  
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

  return json(response)
}