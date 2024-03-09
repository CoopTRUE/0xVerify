<script lang="ts">
  import { onMount } from 'svelte'
  import { cubicInOut } from 'svelte/easing'
  import { slide } from 'svelte/transition'
  import Form from './Form.svelte'

  export let data
  $: console.log(data)

  let loaded = false
  onMount(() => (loaded = true))
</script>

<svelte:head>
  <title>0xVerify</title>
  <meta
    name="description"
    content="A simple and efficient way to verify cryptographic signatures from Ethereum addresses."
  />
</svelte:head>

{#key loaded}
  <main class="container mx-auto flex flex-col items-center">
    <h1
      class="pb-2 font-['Orbitron'] text-[min(5rem,15vw)] font-black leading-none"
      in:slide={{ axis: 'x', duration: 900, easing: cubicInOut }}
    >
      0xVerify
    </h1>
    <Form data={data.form} />
  </main>
{/key}

<style lang="postcss">
</style>
