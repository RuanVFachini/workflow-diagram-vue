<template>
  <div class="home">
    <div v-if="onEdit" class="main-display">
      <Diagram v-model="diagram" @edit-item="openEdit">
        <div class="diagram-menu">
          <b-nav pills>
            <b-button class="btn btn-danger" @click="clear">Limpar</b-button>
            <b-button class="btn btn-info ml-2" @click="save">Salvar</b-button>
          </b-nav>
        </div></Diagram
      >
    </div>
    <div v-else class="main-grid">
      <DiagramForm @saved="updateGrid"></DiagramForm>
      <DiagramGrid :update="update" @edit="editAction"></DiagramGrid>
    </div>
  </div>
</template>

<script>
import Diagram from "../../components/Diagram";
import DiagramGrid from "./DiagramGrid";
import DiagramForm from "./DiagramForm";
import cloneDeep from "lodash/cloneDeep";
import Axios from "axios";

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
        links: [],
      },
      update: false,
      isSaving: false,
    };
  },

  methods: {
    openEdit(event) {
      console.log(event);
    },
    updateGrid() {
      this.update = !this.update;
    },
    editAction(event) {
      let diagram = cloneDeep(event);
      diagram.actions = JSON.parse(diagram.actions);
      diagram.links = [];
      this.diagram = diagram;
      this.onEdit = true;
    },
    clear() {
      this.diagram.actions = [];
      this.diagram.links = [];
    },
    save() {
      this.isSaving = true;

      try {
        let diagramToSave = cloneDeep(this.diagram);
        diagramToSave.links.forEach((link) => {
          if (link.input && link.output) {
            link.output.ref.output = link.input.ref.name;
            link.input.ref.input = link.output.ref.name;
          } else if (link.input && link.alterput) {
            link.alterput.ref.alterput = link.input.ref.name;
            link.input.ref.input = link.alterput.ref.name;
          }
        });

        let actions = cloneDeep(diagramToSave.actions);
        delete diagramToSave.actions;
        delete diagramToSave.links;
        diagramToSave.actions = JSON.stringify(actions);

        Axios.put(
          `http://localhost:8000/api/workflows/${diagramToSave.id}`,
          diagramToSave
        ).finally(() => {
          this.isSaving = false;
        });
      } catch (err) {
        console.log(err);
        this.isSaving = false;
      }
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

.diagram-menu {
  padding: 5px;
}

.main-display {
  height: 100%;
}
</style>
