<template>
  <div id="app">
    <Diagram :params="actions" />
  </div>
</template>

<script>
import Diagram from "./components/Diagram";

export default {
  name: "App",
  components: {
    Diagram,
  },
  data() {
    return {
      actions: [],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
