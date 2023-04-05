<script>
  import Wallet from './Wallet.svelte'
</script>

<svelte:head>
  <title>0xVerify</title>
  <meta
    name="description"
    content="A quick and easy way create and verify ethereum wallet ownership."
  />
</svelte:head>

<main>
  <h1>Create Signature</h1>
  <Wallet />
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    font-family: 'Norican', cursive;
    font-size: 3.5rem;
  }
</style>
