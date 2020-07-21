<template>
  <div id="main-container">
    <b-nav class="p-1">
      <b-btn active @click="Clear">Limpar</b-btn>
      <b-btn active @click="Add" class="ml-2">Adicionar</b-btn>
    </b-nav>
    <div class="body-container">
      <svg
        id="main-grid"
        @mousewheel.prevent="zoom($event)"
        @mousedown.prevent="panViewStart($event)"
        @mousemove.prevent="panViewMove($event)"
        @mouseup.prevent="unselect"
      >
        <g id="main-svg-pan" :transform="getSvgPosition">
          <line x1="0" y1="10" x2="10" y2="0" />
          <g id="main-svg-zoom">
            <TwoWayCard
              v-for="action in actions"
              :key="action.name"
              :value="action"
              height="110"
              width="200"
              @move="move($event)"
              @select="select($event)"
              @unselect="unselect"
              @open="openEdit($event)"
              @click-input="setSelectedPort($event, 'input')"
              @click-output="setSelectedPort($event, 'output')"
            />
            <LinkLine
              v-for="link in links"
              :key="link.id"
              :value="link"
              @select-line="setSelectedLine($event)"
            />
          </g>
        </g>
      </svg>
      <LigaturesMap :values="links" @drop-item="dropLink($event)" />
    </div>
  </div>
</template>

<script>
import TwoWayCard from "./TwoWayCard";
import LinkLine from "./LinkLine";
import LigaturesMap from "./LigaturesMap";

export default {
  name: "Diagram",

  props: ["params"],

  components: {
    TwoWayCard,
    LinkLine,
    LigaturesMap,
  },

  mounted() {
    this.actions = this.params;
  },

  data() {
    return {
      actions: [],
      links: [],
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
    };
  },

  methods: {
    openEdit(action) {
      alert(action.name);
    },

    Clear() {
      this.actions = [];
      this.links = [];
    },

    Add() {
      const newAct = {
        title: "nova ação",
        name: this.findAvaliableName(),
        inputs: [
          {
            name: "list",
            value: null,
          },
        ],
        outputs: [
          {
            name: "list",
            value: null,
          },
        ],
        x: 50,
        y: 50,
      };

      this.actions.push(newAct);
    },

    setSelectedLine(event) {
      this.selectedLine = event;
      console.log(event);
    },

    dropLink(event) {
      const index = this.links.findIndex((l) => l.id == event);
      this.links.splice(index, 1);
      console.log(this.links);
    },

    findAvaliableName() {
      let exists = 1;
      let count = 0;
      let name = "";
      while (exists > 0) {
        name = `new-action-${count}`;
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
      this.prevPos = {
        x: event.x,
        y: event.y,
      };
    },

    unselect() {
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
      if (this.stage && this.stage.input && this.stage.output) {
        this.stage.id = this.getLinkId();
        const index = this.links.findIndex((x) => x.id === this.stage.id);
        if (index < 0) {
          this.links.push({ ...this.stage });
        }
        this.stage = [];
      }
    },

    getLinkId() {
      let exists = 1;
      let idNameSufix = 0;
      let name = "";
      while (exists !== null) {
        name =
          this.stage.input.port.name +
          "_" +
          this.stage.input.action.name +
          "_" +
          this.stage.output.port.name +
          "_" +
          this.stage.output.action.name +
          "_" +
          idNameSufix;
        exists = document.getElementById(name);
        idNameSufix++;
      }
      return name;
    },

    zoom(event) {
      if (event.wheelDelta > 0 && this.scale < 1) {
        this.scale += 0.1;
      } else if (event.wheelDelta < 0 && this.scale > 0.3) {
        this.scale -= 0.1;
      }
      const svgZoom = document.getElementById("main-svg-zoom");
      svgZoom.style.transform = `scale(${this.scale})`;
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
  flex-direction: column;
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
