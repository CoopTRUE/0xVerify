<script>
  import '../app.postcss'
  import Footer from '$lib/components/Footer.svelte'
  import { Toaster } from '$lib/components/ui/sonner'
</script>

<Toaster />
<div class="container mx-auto flex min-h-screen flex-col justify-between">
  <div class="flex flex-1 items-center justify-center">
    <slot />
  </div>
  <Footer />
</div>
