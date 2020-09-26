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
        @mousedown="select($event)"
        @mousemove="$emit('move', $event)"
        @mouseup="$emit('unselect')"
        @mouseleave="$emit('unselect')"
        @dblclick="enableTitleEdition()"
      >
        <p :style="styleP()">
          {{ value.title | upperCase }}
        </p>
      </div>
      <div class="act-menu-region">
        <ul class="act-menu-left" :style="listLeftStyle()">
          <li class="list-item" :style="listItemStyle()">
            <b-icon
              class="card-action"
              :icon="flagIcon()"
              variant="primary"
              :scale="iconScale"
              :style="flagStyle()"
              @click="$emit('set-root', value)"
            ></b-icon>
          </li>
        </ul>
        <ul class="act-menu-right" :style="listRightStyle()">
          <li class="list-item" :style="listItemStyle()">
            <b-icon
              @click="$emit('edit', value)"
              class="card-action"
              icon="pencil"
              variant="primary"
              :scale="iconScale"
            ></b-icon>
          </li>
          <li class="list-item" :style="listItemStyle()">
            <b-icon
              @click="$emit('clone', value)"
              class="card-action"
              icon="subtract"
              variant="secondary"
              :scale="iconScale"
            ></b-icon>
          </li>
          <li class="list-item" :style="listItemStyle()">
            <b-icon
              @click="$emit('remove', value)"
              class="card-action"
              icon="trash"
              variant="danger"
              :scale="iconScale"
            ></b-icon>
          </li>
        </ul>
      </div>
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

    iconScale: function() {
      return 1.5 * this.scale;
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

    listItemStyle() {
      let margin;
      if (this.scale > 0.75) {
        margin = 15 * this.scale;
      } else if (this.scale > 0.5) {
        margin = 7 * this.scale;
      } else {
        margin = this.scale;
      }

      return {
        "margin-left": margin + "px",
        "margin-right": margin + "px",
      };
    },

    listRightStyle() {
      let twoPixels = 1 * this.scale;
      let height = 30 * this.scale;
      return {
        margin: 0 + "px",
        height: height + "px",
        "padding-left": 0 + "px",
        "padding-right": 0 + "px",
        "padding-top": twoPixels + "px",
        "padding-bottom": twoPixels + "px",
        "background-color": "white",
        "border-right": twoPixels + "px solid black",
        "border-bottom": twoPixels + "px solid black",
      };
    },

    listLeftStyle() {
      let twoPixels = 1 * this.scale;
      let height = 30 * this.scale;
      return {
        margin: 0 + "px",
        height: height + "px",
        "padding-left": 0 + "px",
        "padding-right": 0 + "px",
        "padding-top": twoPixels + "px",
        "padding-bottom": twoPixels + "px",
        "background-color": "white",
        "border-left": twoPixels + "px solid black",
        "border-bottom": twoPixels + "px solid black",
      };
    },

    select(event) {
      event.action = this.value;
      this.$emit("select", event);
    },

    flagStyle() {
      if (!this.value.input && !this.value.alterput) {
        return { display: "unset" };
      }
      return { display: "none" };
    },

    flagIcon() {
      if (this.value.isRoot) {
        return "flag-fill";
      }
      return "flag";
    },

    enableTitleEdition() {
      this.$emit('edit-title', this.value);
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
  },
};
</script>

<style scoped>
.act-menu-right {
  list-style: none;
  display: flex;
  justify-content: flex-end;
}

.act-menu-left {
  list-style: none;
  display: flex;
  width: 100%;
  justify-content: flex-start;
}

.list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.card-action:hover {
  cursor: pointer;
}

.act-menu-region {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
