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
  const promptString = `Good How Might We questions are properly scoped. How Might We questions should lead to many answers instead of a specific solution. 

  Here is a user need statement: Harried mother of three, rushing through the airport only to wait hours at the gate, needs to entertain her playful children because “annoying little brats” only irritate already frustrated fellow passengers.
  Here are some strategies that you can use and examples: Amp up the good: HMW use the kids’ energy to entertain fellow passenger?
  Remove the bad: HMW separate the kids from fellow passengers?
  Explore the opposite: HMW make the wait the most exciting part of the trip?
  Question an assumption: HMW entirely remove the wait time at the airport?
  Go after adjectives: HMW we make the rush refreshing instead of harrying?
  ID unexpected resources: HMW leverage free time of fellow passengers to share the loa ?
  Create an analogy from need or context: HMW make the airport like a spa? Like a playground?
  Play POV against the challenge: HMW make the airport a place that kids want to go?
  Change a status quo: HMW make playful, loud kids less annoying?
  Break POV into pieces: HMW entertain kids? HMW slow a mom down? HMW mollify delayed passengers?

  Below are some examples of good How Might We questions.
  user need statement: Sugata, a desperate parent living in a remote village needs the means to give her premature baby a way to survive because modern healthcare options are unaffordable and more than 4-hours away
  how might we questions: * How might we make modern healthcare more affordable for Sugata?
  * How might we bring modern healthcare options closer to Sugata?
  * How might we replace current modern healthcare options to be more accessible to Sugata?
  * How might we reduce the amount of babies that are born prematurely?
  user need statement: John, a retiree who is looking for a new hobby, needs a way to meet new people and learn new things because he is bored and wants to stay active and engaged.
  how might we questions: * How might we channel John's boredom into a productive and fun activity?
  * How might we find alternate ways of staying active and engaged for John?
  * How might we get John back into working at a more fun and engaging job?
  * How might we foster John’s social connections and interactions through his hobbies?
  * How might we create opportunities for John to learn new things and challenge himself in a fun and supportive environment?
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