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
import BasicCard from "./BasicCard.vue";
export default {
  extends: BasicCard,
  name: "ThreeWayCard",

  methods: {
    midContentStyle() {
      return {
        width: "100%",
        "background-color": "rgb(46, 146, 68)",
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
  },
};
</script>
