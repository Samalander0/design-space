<script>
  export let icon
  export let name = "AI Tool"
  export let title = "Generative AI Tool"
</script>

<a class="nav-item" href={name.toLowerCase()}>
  <div class="item-header">
    <img src={icon} alt="gradient shape"/>
    <p>{name}</p>
  </div>
  <div class="item-content">
    <p>{title}</p>
  </div>
</a>