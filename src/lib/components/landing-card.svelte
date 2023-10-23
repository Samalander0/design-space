<script>
  export let icon
  export let name = "AI Tool"
  export let title = "Generative AI Tool"
  export let description = "This is a placeholder, and will be a discription."
</script>

<a class="card" href={name.toLowerCase()}>
  <div class="card-top">
    <div class="card-name">
      <img src={icon} alt="gradient shape"/>
      <p>{name}</p>
    </div>
    <img class="card-arrow" src="/assets/arrow.svg" alt="forward arrow"/>
  </div>
  <div class="card-content">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
</a>