<script>
  import '$lib/styles/tool.scss'
  import OutputCard from '$lib/components/OutputCard.svelte';

  const userOptions = [
    "Sam, a high school student who is taking a challenging history class",
    "Jill, a marine biologist who works on habitat restoration",
    "Avery, a chocolate factory worker who struggles to pay their bills",
  ]
  const needsOptions = [
    "to remember information better",
    "to walk their dog twice daily",
    "to find a job",
  ]
  const becauseOptions = [
    "they have always struggeled with a bad memory",
    "their dog needs two walks every day",
    "they want to earn more money"
  ]

  let user,
      needs,
      because;

  function setInputs() {
    user = userOptions[Math.floor(Math.random() * userOptions.length)]
    let rand = Math.floor(Math.random() * needsOptions.length)
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
  <p>This tool will help you generate how might we questions. Also, note that the input for this tool is a user need statement.</p>
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