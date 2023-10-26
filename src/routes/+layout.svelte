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
      <h3>Intro</h3>
      <NavItem
        icon="assets/shape-read.svg"
        name="Design"
        title="What is design thinking?"
      />
      <NavItem
        icon="assets/shape-read.svg"
        name="About"
        title="What is Design Space?"
      />
    </div>
    <div class="nav-group">
      <h3>Empathize</h3>
      <NavItem
        icon="assets/shape-user.svg"
        name="User"
        title="Sample user need statements"
      />
      <NavItem
        icon="assets/shape-interview.svg"
        name="Interview"
        title="Interview question generator"
      />
    </div>
    <div class="nav-group">
      <h3>Define</h3>
      <NavItem
        icon="assets/shape-hmw.svg"
        name="HMW"
        title="How Might We question generator"
      />
    </div>
  </nav>
  <main>
    <slot />
  </main>
</div>
