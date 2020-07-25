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
      actions: [
        {
          title: "desvia-se-true",
          type: "two-way",
          name: "If",
          inputs: [
            {
              name: "item",
              value: null,
            },
          ],
          outputs: [
            {
              name: "item",
              value: null,
            },
          ],
          x: 50,
          y: 50,
        },
        {
          title: "Percorre lista",
          type: "two-way",
          name: "Loop",
          inputs: [
            {
              name: "item",
              value: null,
            },
          ],
          outputs: [
            {
              name: "item",
              value: null,
            },
          ],
          x: 50,
          y: 50,
        },
      ],
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
