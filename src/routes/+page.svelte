<script lang="ts">
  import { goto } from "$app/navigation";
  import type { PageProps } from "./$types";
  import Profilepicture from "./Profilepicture.svelte";

  let { data }: PageProps = $props();
</script>

<h1>Welcome, {data.fullName}.</h1>
<Profilepicture src={"https://cdn.nathcat.net/pfps/" + data.pfpPath}
></Profilepicture>

<div class="content-card">
  <h2>User information</h2>
  <p>
    Username: {data.username}
  </p>
  <p>
    Email: {data.email}
  </p>
  <p>
    Verified: {data.verified ? "yes" : "no"}
  </p>
</div>

<h3>
  <a href="https://data.nathcat.net/sso/docs/policies/privacy-policy.php"
    >View our privacy policy</a
  >
</h3>

<button
  on:click={() => {
    goto("/logout");
  }}>Logout</button
>
