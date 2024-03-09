<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import Smile from 'lucide-svelte/icons/smile'

  let clicked = 0
</script>

<svelte:head>
  <title>0xVerify</title>
  <meta
    name="description"
    content="A simple and efficient way to verify cryptographic signatures from Ethereum addresses."
  />
</svelte:head>

<main>
  <h1 class="flex items-center">Welcome<Smile /></h1>
  <Button on:click={() => clicked++}>Clicked {clicked} {clicked === 1 ? 'time' : 'times'}</Button>
</main>

<style lang="postcss">
</style>
