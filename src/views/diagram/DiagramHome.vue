<template>
  <div class="home">
    <Diagram :v-if="diagram" v-model="diagram.actions" @edit-item="openEdit"
      ><b-button>teste</b-button></Diagram
    >
    <DiagramGrid :v-if="diagram === false"> </DiagramGrid>
  </div>
</template>

<script>
import Diagram from "../../components/Diagram";
import DiagramGrid from "./DiagramGrid";

export default {
  name: "DiagramHome",
  components: {
    Diagram,
    DiagramGrid,
  },

  data() {
    return {
      actions: [],
    };
  },

  methods: {
    openEdit(event) {
      console.log(event);
    },
  },
};
</script>

<style scoped>
.home {
  height: 100%;
}
</style>
