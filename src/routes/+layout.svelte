<script>
  import 'normalize.css'
  import '../global.scss'
  import { Toaster } from 'svelte-french-toast'
</script>

<slot />
<Toaster position="bottom-center" />
