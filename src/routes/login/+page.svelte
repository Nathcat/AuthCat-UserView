<div class="content">
  <div class="main align-center">
    <h1>Welcome to AuthCat</h1>
    <p>
      This is the brand new user view application for AuthCat OAuth. In order to
      access your user information, please click the button below to login via
      AuthCat.
    </p>
    <button
      on:click={() => {
        window.location.href =
          "https://auth.nathcat.net/auth?client_id=112336d2-a46a-11f1-971d-6c4b902e&response_type=code";
      }}>Login with AuthCat</button
    >
  </div>
</div>
