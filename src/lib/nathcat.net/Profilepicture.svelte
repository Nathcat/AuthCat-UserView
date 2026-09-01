<script lang="ts">
  let { src, width } = $props();

  const pfpsRoot = "https://cdn.nathcat.net/pfps/";
</script>

<div class="profile-picture-container" style="width:{width}">
  <img src={pfpsRoot + src} />
</div>

<style>
  .profile-picture-container {
    aspect-ratio: 1;
    border-radius: 50%;
    background-image: linear-gradient(45deg, #e600ff 0%, #00ccff 100%);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .profile-picture-container img {
    width: 95%;
    aspect-ratio: 1;
    border-radius: 50%;
    object-fit: cover;
  }
</style>
