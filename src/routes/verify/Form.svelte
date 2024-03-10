<script lang="ts">
  import * as Form from '$lib/components/ui/form'
  import { Input } from '$lib/components/ui/input'
  import { Textarea } from '$lib/components/ui/textarea'
  import { formSchema, type FormSchema } from './schema'
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms'
  import { zodClient } from 'sveltekit-superforms/adapters'
  import { slide } from 'svelte/transition'
  import FileCheck from 'lucide-svelte/icons/file-check'
  import ScrollText from 'lucide-svelte/icons/scroll-text'
  import { Button } from '$lib/components/ui/button'
  import { copyText } from 'svelte-copy'
  import { toast } from 'svelte-sonner'

  export let data: SuperValidated<Infer<FormSchema>, string>

  const form = superForm(data, {
    validators: zodClient(formSchema),
    resetForm: false,
  })

  const { form: formData, message: recoveredAddress, enhance, submitting } = form

  async function copyAddress() {
    await copyText($recoveredAddress!).catch(() => {
      toast.error('Failed to copy address to clipboard.')
    })
    toast.success('Address copied to clipboard!')
  }
</script>

<form
  method="POST"
  use:enhance
  class="flex flex-col gap-6"
  in:slide={{ delay: 400, duration: 500 }}
>
  <div class="flex flex-col gap-4 md:flex-row">
    <Form.Field {form} name="message" class="space-y-1">
      <Form.Control let:attrs>
        <Form.Label class="text-md">Message</Form.Label>
        <Textarea
          {...attrs}
          bind:value={$formData.message}
          class="w-[min(24rem,80vw)] md:w-[min(24rem,45vw)]"
          placeholder="Hello, World!"
        />
      </Form.Control>
      <!-- <Form.Description>Enter the message you want to verify.</Form.Description> -->
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="signatureHash" class="space-y-1">
      <Form.Control let:attrs>
        <Form.Label class="text-md">Signature Hash</Form.Label>
        <Textarea
          {...attrs}
          bind:value={$formData.signatureHash}
          class="w-[min(24rem,80vw)] md:w-[min(24rem,45vw)]"
          placeholder="0x..."
        />
      </Form.Control>
      <!-- <Form.Description>Enter the signatureHash you want to verify.</Form.Description> -->
      <Form.FieldErrors />
    </Form.Field>
  </div>
  <Form.Field {form} name="address">
    <Form.Control let:attrs>
      <Form.Label class="text-md">Address (Optional)</Form.Label>
      <Input {...attrs} bind:value={$formData.address} placeholder="0x..." />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button disabled={$submitting}>
    {#if $formData.address}
      <FileCheck class="mr-1" size={18} />
      Verify Address
    {:else}
      <ScrollText class="mr-1" size={18} />
      Get Signer Address
    {/if}
  </Form.Button>
</form>
{#if $recoveredAddress}
  <p class="pt-4" transition:slide>
    The address
    <Button class="p-0 text-base font-bold" variant="link" on:click={copyAddress}>
      {$recoveredAddress}
      <span class="sr-only">Copy address to clipboard</span>
    </Button>
    was recovered from the signature.
  </p>
{/if}
