<script>
  import Footer from "../components/Footer.svelte";
  import { user$ } from "../store";
  const logout = () => {
    user$.set(null);
    localStorage.removeItem("token");
    localStorage.removeItem("id_token");
  };
</script>

<div>나의 당근</div>
<button on:click={logout}>로그 아웃</button>
<Footer location="my" />
