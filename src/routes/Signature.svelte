<script lang="ts">
  import { signer } from '$lib/stores'

  let message = ''
  let signature = ''

  function sign() {
    if (!$signer) return
    $signer
      .signMessage(message)
      .then((sig) => {
        signature = sig
      })
      .catch((err) => {
        console.error(err)
      })
  }
</script>

<textarea
  name="signature"
  placeholder={$signer ? 'Type your message here...' : 'Connect your wallet to sign a message'}
  cols="30"
  rows="10"
  bind:value={message}
  readonly={!$signer}
/>
<button
  on:click={() => {
    if ($signer) {
      $signer
        .signMessage(message)
        .then((sig) => {
          signature = sig
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }}
  disabled={!$signer}
>
  Sign Message
</button>
<div class="signature">
  <p>Signature:</p>
  <p>{signature}</p>
</div>

<style lang="scss">
  textarea {
    border: none;
    resize: none;
    font-size: 1.5rem;
    padding: 1rem;
    border-radius: 0.4rem;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 0 0 1px #ced4da;
    &:focus {
      outline: none;
      &:not([readonly]) {
        box-shadow: 0 0 0 2px #007bff;
      }
    }
    &[readonly]:hover {
      cursor: not-allowed;
    }
  }
  .signature {
    margin-top: 2rem;
    p {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.5rem;
      margin: 0;
    }
  }
</style>
