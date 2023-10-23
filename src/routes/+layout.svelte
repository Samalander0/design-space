<script>
  import '$lib/styles/globals.scss'
  import NavItem from '../lib/components/nav-item.svelte';
</script>

<div class="app">
  <nav class="main-nav">
    <div class="nav-title">
      <img src="/assets/logo.svg" alt="logo"/>
      <h2>Design Space</h2>
    </div>
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
