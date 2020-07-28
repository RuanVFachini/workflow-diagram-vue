<template>
  <div id="main-container">
    <div>
      <b-nav class="p-1">
        <b-list-group>
          <b-list-group-item @click="trasnlateToInit">
            Inicio
          </b-list-group-item>
          <b-list-group-item @click="Clear">
            Limpar
          </b-list-group-item>
          <b-list-group-item
            draggable="true"
            @dragend="dropNew($event, 'two-way')"
          >
            Two Ways
          </b-list-group-item>
          <b-list-group-item
            draggable="true"
            @dragend="dropNew($event, 'three-way')"
          >
            Three Ways
          </b-list-group-item>
          <b-list-group-item
            draggable="true"
            @dragend="dropNew($event, 'single-way-in')"
          >
            Single Way In
          </b-list-group-item>
          <b-list-group-item
            draggable="true"
            @dragend="dropNew($event, 'single-way-out')"
          >
            Single Way Out
          </b-list-group-item>
        </b-list-group>
      </b-nav>
    </div>
    <div class="body-container">
      <svg
        id="main-grid"
        @mousedown.prevent="mouseDown($event)"
        @mousemove.prevent="mouseMove($event)"
        @mouseleave.prevent="unselect"
        @mouseup.prevent="unselect"
      >
        <DiagramCard
          v-for="action in actions"
          :key="action.name"
          :value="action"
          :scale="scale"
          :origin="svg"
          :height="cardHeight"
          :width="cardWidth"
          @move="move($event)"
          @select="select($event)"
          @unselect="unselect"
          @click-input="setSelectedPort($event, 'input')"
          @click-output="setSelectedPort($event, 'output')"
          @click-alterput="setSelectedPort($event, 'alterput')"
        />
        <LinkLine
          v-for="link in links"
          :key="link.id"
          :value="link"
          :scale="scale"
          :origin="svg"
          @select-line="setSelectedLine($event)"
        />
      </svg>
      <LigaturesMap
        :values="links"
        @drop-item="dropLink($event)"
        @in-ligature="inLigature($event)"
        @out-ligature="outLigature($event)"
      />
    </div>
  </div>
</template>

<script>
import DiagramCard from "./DiagramCard";
import LinkLine from "./LinkLine";
import LigaturesMap from "./LigaturesMap";

export default {
  name: "Diagram",

  props: ["paramActs"],

  components: {
    DiagramCard,
    LinkLine,
    LigaturesMap,
  },

  mounted() {
    this.actions = this.paramActs;
  },

  data() {
    return {
      actions: [],
      links: [],
      cardWidth: 250,
      cardHeight: 120,
      prevPos: null,
      onMove: null,
      stage: [],
      scale: 1,
      prevPanPos: null,
      svg: {
        x: 0,
        y: 0,
      },
      selectedLine: null,
      midleMouseBtnPress: false,
    };
  },

  methods: {
    Clear() {
      this.actions = [];
      this.links = [];
    },

    inLigature(event) {
      this.changeColirLinkLine(event, "black", "red");
    },

    outLigature(event) {
      this.changeColirLinkLine(event, "red", "black");
    },

    changeColirLinkLine(event, oldValue, newValue) {
      for (let i = 1; i <= 5; i++) {
        const idElement = event + "-" + i;
        let element = document.getElementById(idElement);
        let style = element.getAttribute("style");
        style = style.replace(oldValue, newValue);
        element.setAttribute("style", style);
      }
    },

    dropNew(event, type) {
      const midX = this.cardWidth / 2;
      const midY = this.cardHeight / 2;
      this.Add(event.x - midX, event.y - midY, type);
    },

    Add(paramX, paramY, type) {
      const newAct = {
        title: "nova ação",
        type: type,
        name: this.findAvaliableName(),
        x: paramX,
        y: paramY,
      };

      switch (type) {
        case "three-way":
          newAct.alterputs = [
            {
              name: "alt-1",
              value: null,
            },
          ];
          newAct.outputs = [
            {
              name: "out-1",
              value: null,
            },
          ];
          newAct.inputs = [
            {
              name: "in-1",
              value: null,
            },
          ];
          break;
        case "two-way":
          newAct.outputs = [
            {
              name: "out-1",
              value: null,
            },
          ];
          newAct.inputs = [
            {
              name: "in-1",
              value: null,
            },
          ];
          break;
        case "single-way-out":
          newAct.outputs = [
            {
              name: "out-1",
              value: null,
            },
          ];
          break;
        case "single-way-in":
          newAct.inputs = [
            {
              name: "in-1",
              value: null,
            },
          ];
          break;
      }

      newAct.x = newAct.x > 0 ? newAct.x : 0;
      newAct.y = newAct.y > 0 ? newAct.y : 0;

      this.actions.push(newAct);
    },

    setSelectedLine(event) {
      this.selectedLine = event;
    },

    dropLink(event) {
      const index = this.links.findIndex((l) => l.id == event);
      this.removeActionLink(this.links[index]);
      this.links.splice(index, 1);
    },

    removeActionLink(relationship) {
      if (relationship.input && relationship.output) {
        if (relationship.input.action.outputs) {
          relationship.input.action.outputs.filter(
            (x) => x.name === relationship.output.port.name
          ).value = null;
        }
        if (relationship.output.action.inputs) {
          relationship.output.action.inputs.filter(
            (x) => x.name === relationship.input.port.name
          ).value = null;
        }
      }
      if (relationship.input && this.links.alterput) {
        relationship.input.action.alterputs.filter(
          (x) => x.name === relationship.alterput.port.name
        ).value = null;
        relationship.alterput.action.inputs.filter(
          (x) => x.name === relationship.input.port.name
        ).value = null;
      }
    },

    findAvaliableName() {
      let exists = 1;
      let count = 0;
      let name = "";
      while (exists >= 0) {
        name = "new-action-" + count;
        exists = this.actions.findIndex((act) => act.name === name);
        count++;
      }
      return name;
    },

    select(event) {
      if (event.button !== 0) {
        return;
      }
      this.onMove = event.action;
      this.onMove.select = true;
      this.prevPos = {
        x: event.x,
        y: event.y,
      };
    },

    unselect() {
      if (this.onMove && this.onMove.select) {
        this.onMove.select = false;
      }

      this.onMove = null;
      this.onPan = false;
    },

    move(event) {
      if (this.onMove == null) {
        return;
      }
      this.moveAction(event);
      this.prevPos.x = event.x;
      this.prevPos.y = event.y;
    },

    moveAction(event) {
      const speed = 1 / this.scale;
      let valueX = (event.x - this.prevPos.x) * speed;
      let valueY = (event.y - this.prevPos.y) * speed;
      if (this.onMove.x + valueX <= 0) {
        this.onMove.x = 0;
      } else {
        this.onMove.x += valueX;
      }
      if (this.onMove.y + valueY <= 0) {
        this.onMove.y = 0;
      } else {
        this.onMove.y += valueY;
      }
    },

    setSelectedPort(event, type) {
      this.stage[type] = event;
      this.checkLink();
    },

    checkLink() {
      if (
        this.stage &&
        ((this.stage.input && this.stage.output) ||
          (this.stage.input && this.stage.alterput))
      ) {
        this.setAtributeRalationship();
        this.stage.id = this.getLinkId();
        const index = this.links.findIndex((x) => x.id === this.stage.id);
        if (index < 0) {
          this.links.push({ ...this.stage });
        }
        this.stage = [];
      }
    },

    setAtributeRalationship() {
      let inputIndex = this.stage.input.action.inputs.findIndex((x) => {
        if (this.stage.input) {
          x.name === this.stage.input.port.name;
        }
      });
      if (this.stage.alterput && this.stage.input.action.inputs[inputIndex]) {
        this.stage.input.action.inputs[
          inputIndex
        ].value = this.stage.alterput.action.name;
        let alterputIndex = this.stage.alterput.action.alterputs.findIndex(
          (x) => x.name === this.stage.alterput.port.name
        );
        this.stage.alterput.action.inputs[
          alterputIndex
        ].value = this.stage.input.action.name;
      }
      if (this.stage.output && this.stage.input.action.inputs[inputIndex]) {
        this.stage.input.action.inputs[
          inputIndex
        ].value = this.stage.output.action.name;
        let outputIndex = this.stage.output.action.outputs.findIndex(
          (x) => x.name === this.stage.output.port.name
        );
        this.stage.output.action.inputs[
          outputIndex
        ].value = this.stage.input.action.name;
      }
    },

    getLinkId() {
      let exists = 1;
      let idNameSufix = 0;
      let name = "";
      let defaultPrefixName = this.getDefaultPrefixName();
      while (exists !== null) {
        name = defaultPrefixName + idNameSufix;
        exists = document.getElementById(name);
        idNameSufix++;
      }
      return name;
    },

    getDefaultPrefixName() {
      if (this.stage && this.stage.output) {
        return (
          this.stage.input.port.name +
          "_" +
          this.stage.input.action.name +
          "_" +
          this.stage.output.port.name +
          "_" +
          this.stage.output.action.name +
          "_"
        );
      }
      if (this.stage && this.stage.alterput) {
        return (
          this.stage.input.port.name +
          "_" +
          this.stage.input.action.name +
          "_" +
          this.stage.alterput.port.name +
          "_" +
          this.stage.alterput.action.name +
          "_"
        );
      }
    },

    zoom(event) {
      if (event.wheelDelta > 0 && this.scale < 1) {
        this.scale += 0.1;
      } else if (event.wheelDelta < 0 && this.scale > 0.3) {
        this.scale -= 0.1;
      }
    },

    mouseDown(event) {
      this.panViewStart(event);

      if (event.button == 1 && event.buttons == 4) {
        if (this.midleMouseBtnPress) {
          this.trasnlateToInit();
        }

        this.midleMouseBtnPress = true;
        setTimeout(() => {
          this.midleMouseBtnPress = false;
        }, 300);
      }
    },

    panViewStart(event) {
      if (event.button !== 1 && event.buttons !== 4) {
        return;
      }
      this.onPan = true;
      this.prevPanPos = {
        x: event.x,
        y: event.y,
      };
    },

    mouseMove(event) {
      this.panViewMove(event);
    },

    panViewMove(event) {
      if (!this.onPan) {
        return;
      }

      let updateValueX = this.svg.x + event.x - this.prevPanPos.x;
      let updateValueY = this.svg.y + event.y - this.prevPanPos.y;

      if (updateValueX <= 0) {
        this.svg.x = updateValueX;
        this.prevPanPos.x = event.x;
      }

      if (updateValueY <= 0) {
        this.svg.y = updateValueY;
        this.prevPanPos.y = event.y;
      }
    },

    trasnlateToInit() {
      this.svg.x = 0;
      this.svg.y = 0;
    },
  },

  computed: {
    getSvgPosition() {
      return `translate(${this.svg.x},${this.svg.y})`;
    },
  },
};
</script>

<style scoped>
#main-grid {
  width: 100%;
  height: 100%;
  background-color: brown;
}

#main-container {
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
}

.body-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
}
</style>
