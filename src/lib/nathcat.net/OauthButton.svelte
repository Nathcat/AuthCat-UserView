<script lang="ts">
  import { PUBLIC_CLIENT_ID } from "$env/static/public";
</script>

<button
  on:click={() => {
    window.location.href =
      "https://auth.nathcat.net/auth?client_id=" +
      PUBLIC_CLIENT_ID +
      "&response_type=code";
  }}>Login with AuthCat</button
>
