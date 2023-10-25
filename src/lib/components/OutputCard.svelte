<script>
  export let text,
             label,
             number;
  
  let copied = false;

  function copy() {
    if (copied) return;
    navigator.clipboard.writeText(text)
    copied = true;
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="output-card" on:mouseleave={() => {setTimeout(() => {copied = false}, 1000)}} style={`animation-delay: ${number*0.1}s;`}> 
  <div class="card-top">
    <p>{label}</p>
    <p class="number">N° {number}</p>
  </div>
  <p class="card-text">{text}</p>
  <button class="copy" on:click={copy} on:keypress={copy}>
    {#if copied}
      <img src="assets/check.svg" alt="done"/>
    {:else}
      <img src="assets/copy.svg" alt="copy text"/>
    {/if}
  </button>
</div>