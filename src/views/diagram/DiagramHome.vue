<template>
  <div class="home">
    <div v-if="onEdit" class="main-display">
      <Diagram v-model="diagram" @edit-item="openEdit">
        <div class="diagram-menu">
          <b-nav pills>
            <b-button
              class="btn btn-danger"
              @click="clear"
              v-b-tooltip.hover.bottom="'Clear Diagram'"
              >Clear</b-button
            >
            <b-button
              class="btn btn-info ml-2"
              @click="save"
              v-b-tooltip.hover.bottom="'Save Diagram'"
              >Save</b-button
            >
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
      const data = JSON.parse(diagram.actions);
      if (data.actions) {
        diagram.actions = data.actions;
      } else {
        diagram.actions = [];
      }

      if (data.links) {
        diagram.links = data.links;
      } else {
        diagram.links = [];
      }

      this.rebuildRefs(diagram);

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
        const data = {
          actions: diagramToSave.actions,
          links: diagramToSave.links,
        };

        diagramToSave.actions = JSON.stringify(data);

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

    rebuildRefs(diagram) {
      diagram.links.forEach((link) => {
        if (link.input) {
          link.input.ref = this.getReferenceAction(
            diagram,
            link.input.ref.name
          );
        }
        if (link.output) {
          link.output.ref = this.getReferenceAction(
            diagram,
            link.output.ref.name
          );
        }
        if (link.alterput) {
          link.alterput.ref = this.getReferenceAction(
            diagram,
            link.alterput.ref.name
          );
        }
      });
    },

    getReferenceAction(diagram, actionName) {
      return diagram.actions.find((act) => act.name == actionName);
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
