<template>
  <div class="home">
    <div v-if="onEdit">
      <Diagram v-model="diagram.actions" @edit-item="openEdit"
        ><b-button>teste</b-button></Diagram
      >
    </div>
    <div v-else class="main-grid">
      <DiagramForm @saved="updateGrid"></DiagramForm>
      <DiagramGrid :update="update"></DiagramGrid>
    </div>
  </div>
</template>

<script>
import Diagram from "../../components/Diagram";
import DiagramGrid from "./DiagramGrid";
import DiagramForm from "./DiagramForm";

export default {
  name: "DiagramHome",
  components: {
    Diagram,
    DiagramGrid,
    DiagramForm,
  },

  data() {
    return {
      onEdit: false,
      diagram: {
        actions: [],
      },
      update: false,
    };
  },

  methods: {
    openEdit(event) {
      console.log(event);
    },
    updateGrid() {
      this.update = !this.update;
    },
  },
};
</script>

<style scoped>
.home {
  height: 100%;
}

.main-grid {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}
</style>
