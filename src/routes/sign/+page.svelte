<script lang="ts">
  import { onMount } from 'svelte'
  import { cubicInOut } from 'svelte/easing'
  import { slide } from 'svelte/transition'
  import Form from './Form.svelte'
  import { cn } from '$lib/utils'
  import { Button } from '$lib/components/ui/button'

  export let data

  let loaded = false
  onMount(() => (loaded = true))
</script>

<svelte:head>
  <title>0xVerify</title>
  <meta
    name="description"
    content="Recover and verify Ethereum addresses from cryptographic signatures."
  />
</svelte:head>

{#key loaded}
  <main class={cn('flex flex-col items-center opacity-0', loaded && 'opacity-100')}>
    <div in:slide={{ axis: 'x', duration: 900, easing: cubicInOut }} class="pb-6 sm:pb-5">
      <h1 class="mb-2 font-['Orbitron'] text-[clamp(2.5rem,15vw,5rem)] font-black leading-none">
        0xSign
      </h1>
      <p class="text-nowrap text-[clamp(0.6rem,1.1rem,4vw)] font-medium text-muted-foreground">
        Cryptographic signature verification <Button
          variant="link"
          size="sm"
          class="p-0 text-lg"
          href="/verify"
        >
          or verify
        </Button>
      </p>
    </div>
    <Form data={data.form} />
  </main>
{/key}

<style lang="postcss">
</style>
