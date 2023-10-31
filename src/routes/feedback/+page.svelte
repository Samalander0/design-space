<script>
  import '$lib/styles/tool.scss'
  import DOMPurify from 'dompurify';
  import { marked } from 'marked'

  const ideaOptions = [
    "A subscription box service that delivers a curated selection of ethical and sustainable products every month. The products can range from clothing, accessories, beauty, home, food, etc. The service also educates the users on the social and environmental impact of their choices.",
    "A mobile app that connects users with local experts who can teach them various skills or hobbies. The app allows users to browse, book, and rate different learning experiences such as cooking, gardening, photography, yoga, etc.",
    "A robotic pet that can mimic the behavior, appearance, and personality of any animal. The pet can also learn from the user’s interactions and feedback and adapt accordingly. The pet can provide companionship, entertainment, and emotional support to the user.",
    "A travel app that helps users to plan their trips based on their budget, time, and preferences. The app can also suggest hidden gems, local experiences, and off-the-beaten-path destinations that match the user’s interests and personality.",
    "A web platform that allows users to create and share their own interactive stories with branching paths, choices, and consequences. Users can also read and rate other users’ stories and discover new genres and authors."
  ]

  let idea;

  function setInputs() {
    idea = ideaOptions[Math.floor(Math.random() * ideaOptions.length)]
  }
  setInputs()

  let generating = false;
  let output;

  async function generateOutputs() {
    generating = true
    output = null

    const res = await fetch(`./api/feedback/?idea=${idea}`)
    let response = await res.json()
    output = DOMPurify.sanitize(marked(response))

    generating = false
  }
</script>

<svelte:head>
  <title>Interview Question Generator - Design Space</title>
</svelte:head>

<header>
  <div class="tool-name">
    <img src="assets/shape-interview.svg" alt="shape"/>
    <h2>Feedback</h2>
  </div>
  <h1>Idea feedback generator</h1>
  <p>This tool will give feedback on your idea. When using this tool, make sure to describe your idea with as much information as you can, and remember to evaluate your idea beyond just using this tool.</p>
</header>

<div class="generator" style="--bg-color: #E0E6FF; --bg-light: #E5F6FF; --bg-dark: #ADABFF; --bg-gradient: linear-gradient(-30deg, #5585FF 0%, #CB37FF 100%);">
  <div class="input">
    <div class="editor">
      <p>
        My idea is <span contenteditable class="editable" bind:innerText={idea}></span>
      </p>
      <button class="reload" on:click={setInputs}>
        <img src="assets/reload.svg" alt="refresh"/>
      </button>
    </div>
    <button class="submit" on:click={generateOutputs}>
      {#if generating}
        <img src="assets/loading.svg" alt="loading"/>
      {:else}
        Go
      {/if}
    </button>
  </div>

  <div class="output">
    {#if output}
      <h2>Output</h2>
      <small>(generated with AI, so there may be some inaccuracies)</small>
      <p class="output-text">
        {@html output}
      </p>
    {/if}
  </div>
</div>