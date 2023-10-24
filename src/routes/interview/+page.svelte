<script>
  import '$lib/styles/tool.scss'
  import { onMount } from 'svelte';

  const userOptions = [
    "science teacher",
    "modern artist",
    "zoologist"
  ]
  const detailsOptions = [
    "teaches virtual classes",
    "wants to share their knowledge",
    "is interested in switching careers"
  ]
  const understandingOptions = [
    "background",
    "role",
    "joys",
    "challenges"
  ]

  let user = userOptions[Math.floor(Math.random() * userOptions.length)],
      details = detailsOptions[Math.floor(Math.random() * detailsOptions.length)],
      understanding = understandingOptions[Math.floor(Math.random() * understandingOptions.length)];

  onMount(() => {
    detailsElement.text = "Hello!!"
  })
</script>

<svelte:head>
  <title>Interview Question Generator - Design Space</title>
</svelte:head>

<header>
  <div class="tool-name">
    <img src="assets/shape-interview.svg" alt="shape"/>
    <h2>Interview</h2>
  </div>
  <p>This tool will help you generate interview questions to get to know your end user. When interviewing, remember to ask follow-up questions.</p>
</header>

<div class="generator">
  <div class="input">
    <div class="editor">
      <p>
        Interview questions for a <span contenteditable class="editable" bind:innerHTML={user}></span> who <span contenteditable class="editable" bind:innerHTML={details}></span> to better understand their <span contenteditable class="editable" bind:innerHTML={understanding}></span>
      </p>
    </div>
    <button>Go</button>
  </div>

  <h2>Outputs:</h2>
</div>