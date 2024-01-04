<script>
  import '$lib/styles/globals.scss'
  import NavItem from '../lib/components/NavItem.svelte';

  let navOpen = false;

  // Analytics
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';

  inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="app">
  <nav class={navOpen ? "open main-nav" : "closed main-nav"}>
    <button on:click={() => {navOpen = true}} class="nav-open">
      <img src="assets/menu.svg" alt="menu"/>
    </button>
    <button on:click={() => {navOpen = false}} class="nav-close">
      <img src="assets/close.svg" alt="menu"/>
    </button>
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
    <div class="nav-group">
      <h3>Ideate</h3>
      <NavItem
        icon="assets/shape-read.svg"
        name="Ideation"
        title="How to come up with ideas"
      />
      <NavItem
        icon="assets/shape-feedback.svg"
        name="Feedback"
        title="Idea feedback generator"
      />
    </div>
  </nav>
  <main>
    <slot />
  </main>
</div>
