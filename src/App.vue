<template>
  <div id="app">
    <Navbar />
    <div class="content-div">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/core/Navbar";
export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content-div {
  height: fit-content;
}
</style>
