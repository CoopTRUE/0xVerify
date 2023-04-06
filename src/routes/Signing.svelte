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

<textarea name="signing area" placeholder={'Type your message here...'} bind:value={message} />
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
  .signature {
    margin-top: 2rem;
    p {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.5rem;
      margin: 0;
    }
  }
  // should start from a small square, to small rectangle, to large rectangle, to large square
  @keyframes intro-anim {
    0% {
      opacity: 0;
      width: 2rem;
      height: 0;
    }
    60% {
      opacity: 1;
      width: 40rem;
      height: 2rem;
    }
    100% {
      width: 40rem;
      height: 20rem;
      padding: 1rem;
    }
  }
</style>
