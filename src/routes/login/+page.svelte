<script lang="ts">
  import OauthButton from "$lib/nathcat.net/OauthButton.svelte";
</script>

<div class="content">
  <div class="main align-center">
    <div class="logo">
      <img src="/AuthCat.png" />
    </div>
    <h1>Welcome to AuthCat</h1>
    <p style="text-align: center; padding: 10px;">
      This is the brand new user view application for AuthCat OAuth. In order to
      access your user information, please click the button below to login via
      AuthCat.
    </p>
    <OauthButton></OauthButton>
  </div>
</div>

<style>
  .logo {
    display: grid;
    place-items: center;
    width: 100%;
  }

  .logo img {
    width: 25%;
  }
</style>
