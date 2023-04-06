<script lang="ts">
  import { signer } from '$lib/stores'
  import { fade, fly } from 'svelte/transition'
  import toast from 'svelte-french-toast'

  let message = ''
  let signatureComplete = false
  let textareaElement: HTMLTextAreaElement

  async function sign() {
    if (!$signer) return
    message = await $signer.signMessage(message).catch((err) => {
      toast.error('Failed to sign message')
      throw err
    })
    signatureComplete = true
  }
  function onFocus() {
    if (!signatureComplete) return
    textareaElement.select()
    navigator.clipboard.writeText(message).then(() => toast.success('Copied to clipboard'))
  }
</script>

<textarea
  name="signing area"
  placeholder={'Type your message here...'}
  bind:value={message}
  bind:this={textareaElement}
  on:focus={onFocus}
  readonly={signatureComplete}
  style:cursor={signatureComplete ? 'pointer' : 'text'}
/>
<div class="bottom">
  <button class="sign-button" on:click={sign} in:fly={{ y: 500, duration: 500, delay: 520 }}>
    Sign Message
  </button>
  {#if signatureComplete}
    <button
      on:click={() => {
        message = ''
        signatureComplete = false
      }}
      in:fade={{ duration: 300 }}
    >
      Reset?
    </button>
  {/if}
</div>

<!-- <div class="signature">
  <p>Signature:</p>
  <p>{signature}</p>
</div> -->

<style lang="scss">
  button {
    cursor: pointer;
  }
  textarea {
    border: none;
    resize: none;
    border-radius: 0.4rem;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 0 0 1px #ced4da;
    font-family: 'JetBrains Mono', monospace;
    // keep width and height from animation even after animation is done
    animation: intro-anim 0.9s ease forwards;
    margin-top: 3rem;
    margin-bottom: 1rem;
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #007bff;
    }
  }
  .sign-button {
    color: hsl(214, 71%, 50%);
    font-weight: 600;
    font-size: 1.5rem;
    background: white;
    border: solid 1px white;
    border-radius: 20px;
    transition: all 0.2s ease-in-out;
    padding: 0.75rem 5rem;
    &:hover,
    &:focus {
      outline: none;
      background: black;
      color: white;
    }
  }
  // should start from a small square, to small rectangle, to large rectangle, to large square
  $min-width: min(90%, 40rem);
  @keyframes intro-anim {
    0% {
      opacity: 0;
      width: 2rem;
      height: 0;
    }
    60% {
      opacity: 1;
      width: $min-width;
      height: 2rem;
    }
    100% {
      width: $min-width;
      height: 20rem;
      padding: 1rem;
    }
  }
</style>
