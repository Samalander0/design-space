<script>
  import '$lib/styles/tool.scss'
  import OutputCard from '$lib/components/OutputCard.svelte';

  const userOptions = [
    "science teacher",
    "modern artist",
    "zoologist",
    "grocery store cashier",
    "startup founder",
    "social media influencer"
  ]
  const detailsOptions = [
    "teaches virtual classes",
    "wants to share their knowledge",
    "is thinking about switching careers",
    "has trouble commuting",
    "wants to read more"
  ]
  const understandingOptions = [
    "background",
    "role",
    "joys",
    "challenges"
  ]

  let user,
      details,
      understanding;

  function setInputs() {
    user = userOptions[Math.floor(Math.random() * userOptions.length)]
    details = detailsOptions[Math.floor(Math.random() * detailsOptions.length)]
    understanding = understandingOptions[Math.floor(Math.random() * understandingOptions.length)]
  }
  setInputs()

  let generating = false;
  let outputs;

  async function generateOutputs() {
    generating = true
    outputs = null

    let prompt = `a ${user} who ${details}. question topic: ${understanding}`

    const res = await fetch(`./api/interview/?prompt=${prompt}`)
    outputs = await res.json()

    generating = false
  }
</script>

<svelte:head>
  <title>Interview Question Generator - Design Space</title>
</svelte:head>

<header>
  <div class="tool-name">
    <img src="assets/shape-interview.svg" alt="shape"/>
    <h2>Interview</h2>
  </div>
  <h1>Interview Question Generator</h1>
  <p>This tool will help you generate interview questions to get to know your end user. When interviewing, remember to ask follow-up questions.</p>
</header>

<div class="generator" style="--bg-color: #E0E6FF; --bg-light: #E5F6FF; --bg-dark: #ADABFF; --bg-gradient: linear-gradient(-30deg, #5585FF 0%, #CB37FF 100%);">
  <div class="input">
    <div class="editor">
      <p>
        Interview questions for a <span contenteditable class="editable" bind:innerText={user}></span> who <span contenteditable class="editable" bind:innerText={details}></span> to better understand their <span contenteditable class="editable" bind:innerText={understanding}></span>
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
    {#if outputs}
      <h2>Outputs</h2>
      <small>(generated with ai, so there may be some inaccuracies)</small>
      <div class="output-cards">
        {#each outputs as output, index}
          <OutputCard text={output.trim()} label="Question" number={index+1}/>
        {/each}
      </div>
    {/if}
  </div>
</div>