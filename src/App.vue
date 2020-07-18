<template>
  <div id="app">
    <svg
      id="main-grid"
      @mousewheel.prevent="zoom($event)"
      @mousedown.prevent="panViewStart($event)"
      @mousemove.prevent="panViewMove($event)"
      @mouseup.prevent="unselect"
    >
      <g id="main-svg-pan" :transform="getSvgPosition">
        <g id="main-svg-zoom">
          <LinkLine
            v-for="link in links"
            :key="link.id"
            :p1="link.input"
            :p2="link.output"
            :width="cardwidth"
            :height="cardheight"
          />
          <TwoWayCard
            v-for="action in actions"
            :key="action.name"
            :value="action"
            @move="move($event)"
            @select="select($event)"
            @unselect="unselect"
            @open="openEdit($event)"
            @click-input="setSelectedPort($event, 'input')"
            @click-output="setSelectedPort($event, 'output')"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import LinkLine from "./components/LinkLine";
import TwoWayCard from "./components/TwoWayCard";

export default {
  name: "App",
  components: {
    LinkLine,
    TwoWayCard,
  },
  data() {
    return {
      actions: [
        {
          title: "desvia-se-true",
          name: "If",
          inputs: [
            {
              name: "list",
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
          name: "Loop",
          inputs: [
            {
              name: "list",
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
      links: [],
      prevPos: null,
      onMove: null,
      stage: {
        input: null,
        output: null,
      },
      scale: 1,
      prevPanPos: null,
      svg: {
        x: 0,
        y: 0,
      },
    };
  },

  methods: {
    openEdit(action) {
      alert(action.name);
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
      const speed = 1 / this.scale;
      this.onMove.x += (event.x - this.prevPos.x) * speed;
      this.onMove.y += (event.y - this.prevPos.y) * speed;

      this.prevPos.x = event.x;
      this.prevPos.y = event.y;
    },

    setSelectedPort(event, type) {
      if (event === null) {
        this.stage[type] = null;
      } else {
        this.stage[type] = {
          action: event.action,
          port: event.port,
        };
      }
      this.checkLink();
    },

    checkLink() {
      if (this.stage.input && this.stage.output) {
        let link = {
          input: {
            action: this.stage.input.action.title,
            port: this.stage.input.port.name,
          },
          output: {
            action: this.stage.output.action.title,
            port: this.stage.output.port.name,
          },
        };
        link.id = JSON.stringify(link);
        this.links.push(link);
        this.stage.input = null;
        this.stage.output = null;
      }
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

      this.svg.x += event.x - this.prevPanPos.x;
      this.svg.y += event.y - this.prevPanPos.y;

      this.prevPanPos = {
        x: event.x,
        y: event.y,
      };
    },
  },

  computed: {
    getSvgPosition() {
      return `translate(${this.svg.x},${this.svg.y})`;
    },
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

#main-grid {
  width: 100%;
  height: 100%;
  background-color: brown;
}
</style>
