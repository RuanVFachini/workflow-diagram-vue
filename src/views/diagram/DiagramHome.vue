<template>
  <div class="home">
    <div v-if="onEdit" class="main-display">
      <Diagram v-model="data" @edit-item="openEdit">
        <div class="diagram-menu">
          <b-nav pills>
            <b-button
              class="btn btn-danger"
              @click="clear"
              >Clear</b-button
            >
            <b-button
              class="btn btn-info ml-2"
              @click="save"
              >Save</b-button
            >
          </b-nav>
        </div></Diagram
      >
    </div>
    <div v-else class="main-grid">
      <DiagramForm></DiagramForm>
      <DiagramGrid @edit="editAction"></DiagramGrid>
    </div>
  </div>
</template>

<script>
import Diagram from "../../components/Diagram";
import DiagramGrid from "./DiagramGrid";
import DiagramForm from "./DiagramForm";
import cloneDeep from "lodash/cloneDeep";
import { mapMutations } from 'vuex';

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
      diagemRef: {},
      data: {
        actions: [],
        links: [],
      },
    };
  },

  methods: {
    ...mapMutations(['saveDiagram']),

    openEdit(event) {
      console.log(event);
    },

    editAction(diagram) {
      this.diagemRef = cloneDeep(diagram);
      let diagramBuilder = []
      const data = this.diagemRef.data;
      if (data.actions) {
        diagramBuilder.actions = data.actions;
      } else {
        diagramBuilder.actions = [];
      }

      if (data.links) {
        diagramBuilder.links = data.links;
      } else {
        diagramBuilder.links = [];
      }

      this.rebuildRefs(diagramBuilder);

      this.diagram = diagramBuilder;
      this.onEdit = true;
    },
    clear() {
      this.data.actions = [];
      this.data.links = [];
    },
    save() {
      const newDiagram = cloneDeep(this.diagemRef);
      newDiagram.data = cloneDeep(this.data);
      this.saveDiagram(newDiagram);
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
