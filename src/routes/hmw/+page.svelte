<script>
  import '$lib/styles/tool.scss'
  import OutputCard from '$lib/components/OutputCard.svelte';

  const userOptions = [
    "Jordan, a young adult who wants to save money for his future",
    "Naomi, a frequent traveler who loves exploring new places",
    "Marcus, a resturaunt manager who wants a more rewarding job",
    "Alex, a college student who is studying abroad in France",
    "John, a stay-at-home dad who has two young children"
  ]
  const needsOptions = [
    "reliably manage his finances",
    "learn about local businesses while traveling",
    "find a new job without leaving his employees behind",
    "a way to connect with other international students and learn about the local culture",
    "a way to find and schedule activities for his family"
  ]
  const becauseOptions = [
    "he often spends more than he earns and has no long term financial plans",
    "she wants to immerse herself in the local culture and avoid tourist traps",
    "his employees aren't trained to take on most of his daily tasks",
    "he is feeling lonely and isolated and wants to make friends",
    "he is constantly running errands and doesn't have time to plan anything fun"
  ]

  let user,
      needs,
      because;

  function setInputs() {
    let rand = Math.floor(Math.random() * needsOptions.length)
    user = userOptions[rand]
    needs = needsOptions[rand]
    because = becauseOptions[rand]
  }
  setInputs()

  let generating = false;
  let outputs;

  async function generateOutputs() {
    generating = true
    outputs = null

    let prompt = `${user}, needs ${needs} because ${because}`

    const res = await fetch(`./api/hmw/?prompt=${prompt}`)
    outputs = await res.json()

    generating = false
  }
</script>

<svelte:head>
  <title>HMW Question Generator - Design Space</title>
</svelte:head>

<header>
  <div class="tool-name">
    <img src="assets/shape-interview.svg" alt="shape"/>
    <h2>HMW</h2>
  </div>
  <h1>HMW Question Generator</h1>
  <p>How Might We (HMW) questions are short questions that help you brainstorm and spark ideas. This tool will help you generate some HMW questions.</p>
</header>

<div class="generator" style="--bg-color: #E0E6FF; --bg-light: #E5F6FF; --bg-dark: #ADABFF; --bg-gradient: linear-gradient(-30deg, #5585FF 0%, #CB37FF 100%);">
  <div class="input">
    <div class="editor">
      <p>
        How might we help <span contenteditable class="editable" bind:innerText={user}></span> and needs <span contenteditable class="editable" bind:innerText={needs}></span> because <span contenteditable class="editable" bind:innerText={because}></span>
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
      <h2>HMW Question</h2>
      <small>(generated with AI, so there may be some inaccuracies)</small>
      <div class="output-cards">
        {#each outputs as output, index}
          <OutputCard text={output.trim()} label="Question" number={index+1}/>
        {/each}
      </div>
    {/if}
  </div>
</div>