<script>
  import Signing from './Signing.svelte'
  import Wallet from './Wallet.svelte'
  import { hackerEffect } from '$lib/effects'
  import { fly } from 'svelte/transition'
  import { onMount } from 'svelte'
  import { signer } from '$lib/stores'

  let ready = false
  onMount(() => {
    ready = true
  })
</script>

<svelte:head>
  <title>0xVerify</title>
  <meta
    name="description"
    content="A quick and easy way create and verify ethereum wallet ownership."
  />
</svelte:head>

<main>
  <h1>
    Create
    <span use:hackerEffect={{ speed: 19, iterations: 9 }}>Signature</span>
  </h1>
  {#if ready}
    <div class="wallet-wrapper" in:fly={{ x: 0, y: 40, duration: 700, delay: 600 }}>
      <Wallet />
    </div>
  {/if}
  {#if $signer}
    <Signing />
  {/if}
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  h1 {
    font-family: 'Norican', cursive;
    font-size: clamp(2.5rem, 14vw, 4rem);
    text-align: center;
    margin-top: min(5rem, 4vw);
    margin-bottom: 1.4rem;
  }
</style>
