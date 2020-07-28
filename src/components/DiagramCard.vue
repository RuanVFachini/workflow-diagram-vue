<template>
  <foreignObject
    :x="cardParams().x"
    :y="cardParams().y"
    :width="cardParams().width"
    :height="cardParams().height"
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
        <div :v-if="value.inputs" :style="inputsStyle()">
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
        <div :v-if="value.alterputs" :style="alterputsStyle()">
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
        <div :v-if="value.outputs" :style="outputsStyle()">
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
import BasicCard from "./BasicCard";

export default {
  extends: BasicCard,
  name: "TwoWayCard",
  computed: {
    type: function() {
      let value = "three";
      if (this.value.inputs && this.value.outputs && !this.value.alterputs) {
        value = "two";
      }
      if (!this.value.inputs && this.value.outputs && !this.value.alterputs) {
        value = "one-out";
      }
      if (this.value.inputs && !this.value.outputs && !this.value.alterputs) {
        value = "one-in";
      }
      return value;
    },
  },
  methods: {
    inputsStyle() {
      let width =
        this.type === "three" ? 33.33 : this.type === "two" ? 50 : 100;
      if (width == 100 && this.value.outputs) {
        return {};
      }

      let inputsStyle = {
        "padding-left": 10 * this.scale + "px",
        display: "flex",
        width: width + "%",
        "flex-direction": "column",
        "justify-content": "space-around",
        "background-color": "rgb(167, 167, 167)",
        "border-bottom-left-radius": 15 * this.scale + "px",
        "border-left": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
        "border-bottom": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
      };

      if (width == 100 && this.value.inputs) {
        inputsStyle["border-bottom-right-radius"] = 15 * this.scale + "px";
        inputsStyle["border-right"] =
          "solid " + 2 * this.scale + "px rgb(46, 43, 43)";
      }
      return inputsStyle;
    },

    outputsStyle() {
      let width =
        this.type === "three" ? 33.33 : this.type === "two" ? 50 : 100;
      let outputStyle = {
        "padding-right": 10 * this.scale + "px",
        display: "flex",
        width: width + "%",
        "flex-direction": "column",
        "justify-content": "space-around",
        "background-color": "rgb(125, 190, 243)",
        "border-bottom-right-radius": 15 * this.scale + "px",
        "border-right": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
        "border-bottom": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
      };
      if (width === 100 && this.value.outputs) {
        outputStyle["border-bottom-left-radius"] = 15 * this.scale + "px";
        outputStyle["border-left"] =
          "solid " + 2 * this.scale + "px rgb(46, 43, 43)";
      } else if (width === 100 && this.value.inputs) {
        return {};
      }
      return outputStyle;
    },

    alterputsStyle() {
      let width =
        this.type === "three" ? 33.33 : this.type === "two" ? 50 : 100;
      if (width == 100 && (this.value.outputs || this.value.inputs)) {
        return {};
      }
      if (width == 50 && this.value.outputs) {
        return {};
      }
      return {
        width: width + "%",
        "padding-bottom": 10 * this.scale + "px",
        display: "flex",
        "flex-direction": "column",
        "justify-content": "space-around",
        "background-color": "rgb(253, 255, 130)",
        "border-bottom": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
      };
    },
  },
};
</script>
