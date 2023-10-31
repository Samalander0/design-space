<script>
  import '$lib/styles/tool.scss'
  import OutputCard from '$lib/components/OutputCard.svelte';

  let firstGeneration = true;
  let generating = false;
  let outputs;

  async function generateOutputs() {
    firstGeneration = false;
    generating = true
    outputs = null

    const res = await fetch(`./api/user`)
    outputs = await res.json()

    generating = false
  }
</script>

<svelte:head>
  <title>User Generator - Design Space</title>
</svelte:head>

<header>
  <div class="tool-name">
    <img src="assets/shape-interview.svg" alt="shape"/>
    <h2>User</h2>
  </div>
  <h1>User Need Statement Generator</h1>
  <p>All design thinking starts with a user. If you're struggling to find users, or just want some practice, this tool can generate sample user need statements. However, you should also try finding some real users to develop solutions for!</p>
</header>

<div class="generator" style="--bg-color: #E0E6FF; --bg-light: #E5F6FF; --bg-dark: #ADABFF; --bg-gradient: linear-gradient(-30deg, #5585FF 0%, #CB37FF 100%);">
  <div class="input">
    <button class="submit solo-button" on:click={generateOutputs}>
      {#if generating}
        <img src="assets/loading.svg" alt="loading"/>
      {:else}
        {#if firstGeneration}
          Generate
        {:else}
          Regenerate
        {/if}
      {/if}
    </button>
  </div>

  <div class="output">
    {#if outputs}
      <h2>Outputs</h2>
      <small>(generated with AI, so there may be some inaccuracies)</small>
      <div class="output-cards">
        {#each outputs as output, index}
          <OutputCard text={output.trim()} label="Sample User" number={index+1}/>
        {/each}
      </div>
    {/if}
  </div>
</div>