<template>
  <foreignObject
    :x="cardParams().x"
    :y="cardParams().y"
    :width="cardParams().width"
    :height="cardParams().height"
    @dblclick="$emit('open', value)"
  >
    <div class="card" draggable="false">
      <div
        class="card-header"
        :style="cardHeaderStyle()"
        draggable="false"
        @mousedown.prevent="select($event)"
        @mousemove="$emit('move', $event)"
        @mouseup="$emit('unselect')"
        @mouseleave="$emit('unselect')"
      >
        <p :style="styleP()">
          {{ value.title | upperCase }}
        </p>
      </div>
      <div :style="cardBodyStyle()" draggable="false">
        <div :style="inputsStyle()">
          <div class="input" v-for="input in value.inputs" :key="input.name">
            <input
              class="link"
              type="checkbox"
              :style="inputStyle()"
              @click.prevent="clickPort($event, 'input', input)"
            />
            <h5 :style="styleH5()">
              {{ input.name | upperCase }}
            </h5>
          </div>
        </div>
        <div :style="alterputsStyle()">
          <div
            class="alterput"
            v-for="alterput in value.alterputs"
            :key="alterput.name"
          >
            <input
              class="link"
              type="checkbox"
              :style="alterputStyle()"
              @click.prevent="clickPort($event, 'alterput', alterput)"
            />
            <h5 :style="styleH5()">
              {{ alterput.name | upperCase }}
            </h5>
          </div>
        </div>
        <div :style="outputsStyle()">
          <div
            class="output"
            v-for="output in value.outputs"
            :key="output.name"
          >
            <h5 :style="styleH5()">
              {{ output.name | upperCase }}
            </h5>
            <input
              class="link"
              type="checkbox"
              :style="inputStyle()"
              @click.prevent="clickPort($event, 'output', output)"
            />
          </div>
        </div>
      </div>
    </div>
  </foreignObject>
</template>

<script>
export default {
  name: "ThreeWayCard",
  props: ["width", "height", "value", "scale", "origin"],

  methods: {
    select(event) {
      event.action = this.value;
      this.$emit("select", event);
    },

    clickPort(event, type, port) {
      let relX = event.target.getClientRects()[0].x - this.value.x;
      let relY = event.target.getClientRects()[0].y - this.value.y;

      relX -= this.origin.x;
      relY -= this.origin.y;

      const customEvent = {
        action: this.value,
        port: port,
        posRel: {
          x: relX,
          y: relY,
        },
      };
      this.$emit(`click-${type}`, customEvent);
    },

    cardParams() {
      let posX = this.value.x + this.origin.x;
      let posY = this.value.y + this.origin.y;
      return {
        x: posX * this.scale,
        y: posY * this.scale,
        width: this.width * this.scale,
        height: this.height * this.scale,
        scale: "transform: scale(" + this.scale + ")",
      };
    },

    cardBodyStyle() {
      return {
        backgroundColor: "none",
        width: "100%",
        height: "100%",
        padding: "0px",
        display: "flex",
        "flex-direction": "row",
        "justify-content": "space-between",
        "align-content": "center",
      };
    },

    midContentStyle() {
      return {
        width: "100%",
        "background-color": "rgb(46, 146, 68)",
      };
    },

    cardHeaderStyle() {
      return {
        "background-color": "rgb(255, 255, 255)",
        width: "100%",
        height: 40 * this.scale + "px",
        padding: "0px",
        display: "flex",
        "flex-direction": "column",
        "justify-content": "space-around",
        "align-content": "center",
        "border-bottom": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
        "border-top": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
        "border-top-left-radius": 15 * this.scale + "px",
        "border-top-right-radius": 15 * this.scale + "px",
        "border-left": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
        "border-right": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
      };
    },

    inputsStyle() {
      return {
        "padding-left": 10 * this.scale + "px",
        display: "flex",
        width: "33.33%",
        "flex-direction": "column",
        "justify-content": "space-around",
        "background-color": "rgb(167, 167, 167)",
        "border-bottom-left-radius": 15 * this.scale + "px",
        "border-left": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
        "border-bottom": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
      };
    },

    alterputsStyle() {
      return {
        width: "33.33%",
        "padding-bottom": 10 * this.scale + "px",
        display: "flex",
        "flex-direction": "column",
        "justify-content": "space-around",
        "background-color": "rgb(253, 255, 130)",
        "border-bottom": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
      };
    },

    outputsStyle() {
      return {
        "padding-right": 10 * this.scale + "px",
        display: "flex",
        width: "33.33%",
        "flex-direction": "column",
        "justify-content": "space-around",
        "background-color": "rgb(125, 190, 243)",
        "border-bottom-right-radius": 15 * this.scale + "px",
        "border-right": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
        "border-bottom": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
      };
    },

    styleH5() {
      return {
        margin: "0px",
        "margin-left": 5 * this.scale + "px",
        "margin-right": 5 * this.scale + "px",
        "font-size": 10 * this.scale + "pt",
      };
    },

    styleP() {
      return {
        "font-size": 10 * this.scale + "pt",
        margin: "0px",
        color: "black",
        "font-weight": 600 * this.scale,
        "font-family":
          "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande','Lucida Sans Unicode', Geneva, Verdana, sans-serif",
      };
    },

    inputStyle() {
      return {
        width: 13 * this.scale + "px",
        height: 13 * this.scale + "px",
      };
    },

    alterputStyle() {
      return {
        width: 13 * this.scale + "px",
        height: 13 * this.scale + "px",
      };
    },
  },
};
</script>

<style scoped>
.card {
  float: left;
  background-color: transparent;
  height: 100%;
  width: 100%;
  padding: 0px;
  border: none;
}

.input {
  float: left;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.output {
  float: right;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.alterput {
  float: right;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  transform: rotate(270deg);
}

.teste {
  background-color: rgb(255, 255, 255);
}

h5:hover {
  cursor: default;
}

input.link:hover {
  cursor: pointer;
}

.card-header:hover {
  cursor: move;
}
</style>
