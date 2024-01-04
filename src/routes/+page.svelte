<script>
  import '$lib/styles/landing.scss'
  import Card from '$lib/components/LandingCard.svelte'
</script>

<svelte:head>
  <title>Design Space</title>
</svelte:head>

<h1>Welcome to Design Space!</h1>
<p>
  Design Space is a freely accesible collection of <a class="link-fancy" href="https://scienceexchange.caltech.edu/topics/artificial-intelligence-research/generative-ai" target="_blank">generative artificial inteligence</a> tools and resources for making <a class="link-fancy" href="design">design thinking</a> more accessible and easier to learn. Start by selecting a tool or learning resource below.
</p>

<section style="--bg-color: #CFEAF9">
  <h2>Intro</h2>
  <div class="cards">
    <Card 
      icon="assets/shape-read.svg" 
      name="Design"
      title="What is Design Thinking?"
      description="An introduction to design thinking and how to think like a designer."
    />
    <Card 
      icon="assets/shape-read.svg" 
      name="About"
      title="What is Design Space?"
      description="Learn about how Design Space works and what you can do with it"
    />
  </div>
</section>

<section style="--bg-color: #E0E6FF">
  <h2>Empathize</h2>
  <div class="cards">
    <Card 
      icon="assets/shape-user.svg" 
      name="User"
      title="Sample User Need Statements"
      description="Generate sample user need statements to have realistic users to practice designing for"
    />
    <Card 
      icon="assets/shape-interview.svg" 
      name="Interview"
      title="Interview Question Generator"
      description="Generate interview questions to better understand and empathize with your end user"
    />
  </div>
</section>

<section style="--bg-color: #E0E6FF">
  <h2>Define</h2>
  <div class="cards">
    <Card 
      icon="assets/shape-hmw.svg" 
      name="HMW"
      title="How Might We Question Generator"
      description="Generate How Might We questions to define your problem and how you might go about solving it"
    />
  </div>
</section>

<section style="--bg-color: #CFEAF9">
  <h2>Ideate</h2>
  <div class="cards">
    <Card 
      icon="assets/shape-read.svg" 
      name="Ideation"
      title="How to come up with ideas"
      description="Learn about different ideation methods and ways to come up with unique, creative, and novel ideas"
    />
    <div style="--bg-color: #E0E6FF">
      <Card 
        icon="assets/shape-feedback.svg" 
        name="Feedback"
        title="Idea feedback generator"
        description="Get feedback on your ideas including ethical implications, constructive criticism, and implementation tips"
      />
    </div>
  </div>
</section>
