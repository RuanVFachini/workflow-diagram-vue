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
      <ul class="act-menu">
        <li>
          <b-icon
            class="card-action"
            icon="pencil"
            variant="primary"
            scale="1.5"
          ></b-icon>
        </li>
        <li>
          <b-icon
            @click="$emit('remove', value)"
            class="card-action"
            icon="trash"
            variant="danger"
            scale="1.5"
          ></b-icon>
        </li>
      </ul>
      <div :style="cardBodyStyle()" draggable="false">
        <div v-if="value.input" :style="inputsStyle()">
          <div class="input">
            <input
              class="link"
              type="checkbox"
              :style="inputStyle()"
              @click.prevent="$emit('click-port', cardParams(), 'input')"
            />
            <h5 :style="styleH5()">
              {{ "I" | upperCase }}
            </h5>
          </div>
        </div>
        <div v-if="value.alterput" :style="alterputsStyle()">
          <div class="alterput">
            <input
              class="link"
              type="checkbox"
              :style="alterputStyle()"
              @click.prevent="$emit('click-port', cardParams(), 'alterput')"
            />
            <h5 :style="styleH5()">
              {{ "A" | upperCase }}
            </h5>
          </div>
        </div>
        <div v-if="value.output" :style="outputsStyle()">
          <div class="output">
            <h5 :style="styleH5()">
              {{ "O" | upperCase }}
            </h5>
            <input
              class="link"
              type="checkbox"
              :style="inputStyle()"
              @click.prevent="$emit('click-port', cardParams(), 'output')"
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
  name: "DiagramCard",
  computed: {
    type: function() {
      let value = "three";
      if (this.value.input && this.value.output && !this.value.alterput) {
        value = "two";
      }
      if (!this.value.input && this.value.output && !this.value.alterput) {
        value = "one-out";
      }
      if (this.value.input && !this.value.output && !this.value.alterput) {
        value = "one-in";
      }
      return value;
    },
  },
  methods: {
    inputsStyle() {
      let width =
        this.type === "three" ? 33.33 : this.type === "two" ? 50 : 100;
      if (width == 100 && this.value.output) {
        return {};
      }

      let inputsStyle = {
        "padding-left": 10 * this.scale + "px",
        display: "flex",
        width: width + "%",
        "background-color": "transparent",
        "flex-direction": "column",
        "justify-content": "space-around",
      };

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
        "background-color": "transparent",
      };
      return outputStyle;
    },

    alterputsStyle() {
      let width =
        this.type === "three" ? 33.33 : this.type === "two" ? 50 : 100;
      return {
        width: width + "%",
        "padding-bottom": 10 * this.scale + "px",
        display: "flex",
        "flex-direction": "column",
        "justify-content": "space-around",
        "background-color": "transparent",
      };
    },
  },
};
</script>

<style scoped>
ul {
  margin: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 2px;
  padding-bottom: 2px;
  background-color: white;
  border-left: 2px solid black;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
}

ul li {
  margin-left: 15px;
  margin-right: 15px;
}
.act-menu {
  list-style: none;
  display: flex;
  justify-content: flex-end;
}

.card-action:hover {
  cursor: pointer;
}
</style>
