<script>
  import '../app.postcss'
  import Footer from '$lib/components/Footer.svelte'
</script>

<div class="container mx-auto flex min-h-screen flex-col justify-between">
  <slot />
  <Footer />
</div>
