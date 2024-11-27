<script>
  export let location;
  const moveToHome = () => {
    window.location.hash = "/";
  };
  const moveToMyPage = () => {
    window.location.hash = "/my";
  };
</script>

<footer>
  <div class="footer-block">
    <div class="footer-icons">
      <div class="footer-icons__img">
        {#if location === "home"}
          <img src="assets/home.svg" alt="home" on:click={moveToHome} />
        {:else}
          <img src="assets/home-solid.svg" alt="home" on:click={moveToHome} />
        {/if}
      </div>
      <div>홈</div>
    </div>
    <div class="footer-icons">
      <div class="footer-icons__img">
        <img src="assets/doc.svg" alt="home" />
      </div>
      <div>동네생활</div>
    </div>
    <div class="footer-icons">
      <div class="footer-icons__img">
        <img src="assets/location.svg" alt="home" />
      </div>
      <div>내근처</div>
    </div>
    <a class="footer-icons" href="chat.html">
      <div class="footer-icons__img">
        <img src="assets/chat.svg" alt="home" />
      </div>
      <div>채팅</div>
    </a>
    <div class="footer-icons" on:click={moveToMyPage}>
      <div class="footer-icons__img">
        {#if location === "my"}
          <img src="assets/user-solid.svg" alt="my page" />
        {:else}
          <img src="assets/user.svg" alt="my page" />
        {/if}
      </div>
      <div>나의 당근</div>
    </div>
  </div>
</footer>
