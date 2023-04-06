<script lang="ts">
  import { browser } from '$app/environment'
  import { signer as signerStore } from '$lib/stores'
  import { ethers } from 'ethers'
  import toast from 'svelte-french-toast'

  let address = ''
  $: shownAddress = address.slice(0, 6) + '...' + address.slice(-4)
  let hover = false

  async function connect() {
    if (!window.ethereum) {
      toast.error('No Ethereum wallet found')
    }
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner().catch((err) => {
      toast.error("Couldn't connect to wallet")
      throw err
    })

    hover = false
    $signerStore = signer
    address = signer.address
  }
  function disconnect() {
    $signerStore = null
    address = ''
  }
  if (browser) {
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length) connect()
      else disconnect()
    })
  }

  function l(s: string) {
    console.log(s)
    return {
      a: 1
    }
  }
</script>

{#if address}
  <button
    class="wallet"
    on:click={disconnect}
    on:mouseenter={() => (hover = true)}
    on:focus={() => (hover = true)}
    on:mouseleave={() => (hover = false)}
    on:blur={() => (hover = false)}
  >
    {#if hover}
      Disconnect?
    {:else}
      {shownAddress}
    {/if}
  </button>
{:else}
  <button class="wallet" on:click={connect}>Connect Wallet</button>
{/if}

<style lang="scss">
  .wallet {
    color: black;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
    background: white;
    border: 1px solid black;
    border-radius: 4px;
    transition: all 0.2s ease-in-out;
    width: 10rem;
    height: 2rem;
    &:hover,
    &:focus {
      outline: none;
      background: black;
      color: white;
    }
    &:focus {
      box-shadow: 0 0 0 2px #007bff;
    }
    cursor: pointer;
  }
</style>
