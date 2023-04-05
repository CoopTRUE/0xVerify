<script lang="ts">
  import { browser } from '$app/environment'
  import { signer as signerStore } from '$lib/stores'
  import { ethers } from 'ethers'
  import toast from 'svelte-french-toast'

  let address = ''
  let ensName = ''
  let shownAddress = ''
  $: {
    if (ensName) {
      if (ensName.length > 9) {
        shownAddress = ensName.slice(0, 6) + '...'
      } else {
        shownAddress = ensName
      }
    } else {
      shownAddress = address.slice(0, 6) + '...' + address.slice(-4)
    }
  }
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

    $signerStore = signer
    address = signer.address
    provider
      .lookupAddress(address)
      .then((name) => {
        if (name) {
          ensName = name
          toast.success(`Connected to ${ensName}`)
        } else {
          toast.success(`Connected to ${shownAddress}`)
        }
      })
      .catch((err) => {
        toast.success(`Connected to ${shownAddress}`)
      })
  }
  function disconnect() {
    $signerStore = null
    address = ''
    ensName = ''
  }
  if (browser) {
    // window.ethereum.on('accountsChanged', (accounts: string[]) => {
    //   disconnect()
    //   if (accounts.length) connect()
    // })
  }
</script>

{#if address}
  <button
    class="wallet"
    on:click={disconnect}
    on:mouseenter={() => (hover = true)}
    on:mouseleave={() => (hover = false)}
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
    &:hover {
      background: black;
      color: white;
    }
    cursor: pointer;
  }
</style>
