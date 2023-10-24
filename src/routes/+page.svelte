<script>
  import '$lib/styles/landing.scss'
  import Card from '$lib/components/LandingCard.svelte'
</script>

<svelte:head>
  <title>Design Space</title>
</svelte:head>

<h1>Welcome to Design Space!</h1>
<p>
  Design Space is a freely accesible collection of <a class="link-fancy" href="https://scienceexchange.caltech.edu/topics/artificial-intelligence-research/generative-ai" target="_blank">generative artificial inteligence</a> tools and resources for learning <a class="link-fancy" href="https://designthinking.ideo.com/" target="_blank">design thinking</a>. Start by selecting a tool or learning resource below.
</p>

<section style="--bg-color: #E0E6FF">
  <h2>Empathize</h2>
  <div class="cards">
    <Card 
      icon="assets/shape-interview.svg" 
      name="Interview"
      title="Interview Question Generator"
      description="Generate interview questions to better understand and empathize with your end user."
    />
  </div>
</section>
