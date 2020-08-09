<template>
  <div class="home">
    <Diagram :paramActs="actions"><b-button>teste</b-button></Diagram>
  </div>
</template>

<script>
import Diagram from "../../components/Diagram";
export default {
  name: "Home",
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

<style scoped>
.home {
  height: 100%;
}
</style>
