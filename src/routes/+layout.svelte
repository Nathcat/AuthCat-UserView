<script lang="ts">
  import favicon from "$lib/assets/favicon.ico";
  import Footer from "./Footer.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>AuthCat</title>
</svelte:head>

<div class="content">
  <div class="main align-center">
    {@render children()}
  </div>
  <Footer></Footer>
</div>
