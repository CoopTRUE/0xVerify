<script lang="ts">
  import { ethers } from 'ethers'

  let message = ''
  let signature = ''
  let address = ''

  function verifyMessage(message: string, signature: string, address: string) {
    const recoveredAddress = ethers.verifyMessage(message, signature)
    return recoveredAddress === address
  }
</script>

<textarea name="verifying area" placeholder="Type your message here..." bind:value={message} />
