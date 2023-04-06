<script>
  import Signing from './Signing.svelte'
  import Wallet from './Wallet.svelte'
  import { hackerEffect } from '$lib/effects'
  import { fade, fly } from 'svelte/transition'
  import { onMount } from 'svelte'
  import { signer } from '$lib/stores'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'

  $: verifyMode = $page.url.searchParams.get('verify') === 'true'

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
    {#if verifyMode}
      Verify
    {:else}
      Create
    {/if}
    <span use:hackerEffect={{ speed: 19, iterations: 9 }}>Signature</span>
  </h1>

  {#if ready}
    <button
      class="change"
      in:fade={{ duration: 700, delay: 600 }}
      on:click={() => goto(`/?verify=${!verifyMode}`)}
    >
      Or {verifyMode ? 'Create' : 'Verify'}?
    </button>
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
    margin: 0;
    // margin-bottom: 1.4rem;
  }
  .change {
    margin-right: min(15rem, 55vw);
    font-size: clamp(1rem, 6vw, 1.2rem);
    font-weight: 400;
    // link color
    border: none;
    // underline
    text-decoration: underline;
    background: none;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    cursor: pointer;
  }
</style>
