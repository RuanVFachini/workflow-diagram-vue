<template>
  <foreignObject
    :x="cardParams().x"
    :y="cardParams().y"
    :width="cardParams().width"
    :height="cardParams().height"
    @mousedown.prevent="select($event)"
    @mousemove="$emit('move', $event)"
    @mouseup="$emit('unselect')"
    @mouseleave="$emit('unselect')"
    @dblclick="$emit('open', value)"
  >
    <div class="card" draggable="false">
      <div :style="cardHeaderStyle()" draggable="false">
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
  name: "TwoWayCard",
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
        backgroundColor: "rgb(46, 146, 68)",
        width: "100%",
        height: "100%",
        padding: "0px",
        display: "flex",
        "flex-direction": "row",
        "justify-content": "space-between",
        "align-content": "center",
        "border-bottom": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
        "border-bottom-left-radius": 15 * this.scale + "px",
        "border-bottom-right-radius": 15 * this.scale + "px",
        "border-left": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
        "border-right": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
      };
    },

    cardHeaderStyle() {
      return {
        "background-color": "rgb(46, 146, 68)",
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
        "margin-left": 10 * this.scale + "px",
        display: "flex",
        "flex-direction": "column",
        "justify-content": "space-around",
      };
    },

    outputsStyle() {
      return {
        "margin-right": 10 * this.scale + "px",
        display: "flex",
        "flex-direction": "column",
        "justify-content": "space-around",
      };
    },

    styleH5() {
      return {
        margin: "0px",
        "margin-left": 5 * this.scale + "px",
        "margin-right": 5 * this.scale + "px",
        "font-size": 12 * this.scale + "pt",
      };
    },

    styleP() {
      return {
        "font-size": 12 * this.scale + "pt",
        margin: "0px",
        color: "yellow",
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
  justify-content: space-around;
  align-items: center;
}

.output {
  float: right;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

h5:hover {
  cursor: default;
}

input.link:hover {
  cursor: pointer;
}
</style>
