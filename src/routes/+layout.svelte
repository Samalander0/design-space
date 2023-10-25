<script>
  import '$lib/styles/globals.scss'
  import NavItem from '../lib/components/NavItem.svelte';
</script>

<div class="app">
  <nav class="main-nav">
    <a class="nav-title" href="/">
      <img src="/assets/logo.svg" alt="logo"/>
      <h2>Design Space</h2>
    </a>
    <div class="nav-group">
      <h3>Empathize</h3>
      <NavItem
        icon="assets/shape-interview.svg"
        name="Interview"
        title="Interview question generator"
      />
    </div>
  </nav>
  <main>
    <slot />
  </main>
</div>
