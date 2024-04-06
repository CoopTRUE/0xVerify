<script lang="ts">
  import { disconnect, reconnect, watchAccount } from '@wagmi/core'
  import { config, projectId } from './config'
  import { type Web3Modal, createWeb3Modal } from '@web3modal/wagmi'
  import { onMount } from 'svelte'
  import { Button } from '$lib/components/ui/button'
  import { address } from '$lib/stores'

  let modal: Web3Modal
  onMount(() => {
    reconnect(config)
    modal = createWeb3Modal({
      wagmiConfig: config,
      projectId,
    })
  })

  $: partialAddress = `${$address?.slice(0, 4)}...${$address?.slice(-4)}`
  watchAccount(config, {
    onChange: ({ address: newAddress }) => {
      $address = newAddress ?? null
    },
  })

  let hover = false
</script>

{#if $address}
  <Button
    on:click={() => disconnect(config)}
    variant="outline"
    on:mouseenter={() => (hover = true)}
    on:mouseleave={() => (hover = false)}
  >
    {#if hover}
      Disconnect
    {:else}
      {partialAddress}
    {/if}
  </Button>
{:else}
  <Button on:click={() => modal.open()}>Connect Wallet</Button>
{/if}
