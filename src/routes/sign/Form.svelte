<script lang="ts">
  import { slide } from 'svelte/transition'
  import { Textarea } from '$lib/components/ui/textarea'
  import { Button } from '$lib/components/ui/button'
  import SquarePen from 'lucide-svelte/icons/square-pen'
  import { signMessage } from '@wagmi/core'
  import { config } from './config'
  import type { EventHandler } from 'svelte/elements'

  const sign = ((e) => {
    signMessage(config, {
      message: 'Hello, World!',
    })
  }) satisfies EventHandler<SubmitEvent, HTMLFormElement>
</script>

<form class="flex flex-col gap-4" in:slide|global={{ delay: 800, duration: 500 }} on:submit={sign}>
  <Textarea class="w-[min(24rem,80vw)] md:w-[min(24rem,45vw)]" placeholder="Hello, World!" />
  <Button type="submit">
    <SquarePen class="mr-1" size={18} />
    Sign Message
  </Button>
</form>
