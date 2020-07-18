<template>
  <foreignObject
    :x="value.x"
    :y="value.y"
    :width="250"
    :height="130"
    @mousedown.prevent="select($event)"
    @mousemove="$emit('move', $event)"
    @mouseup="$emit('unselect')"
    @mouseleave="$emit('unselect')"
    @dblclick="$emit('open', value)"
  >
    <div class="card" draggable="false">
      <div class="card-header" draggable="false">
        <p>
          {{ value.title | upperCase }}
        </p>
      </div>
      <div class="card-body" draggable="false">
        <div class="inputs">
          <div class="input" v-for="input in value.inputs" :key="input.name">
            <input
              class="link"
              type="checkbox"
              @click.prevent="clickPort($event, 'input', input)"
            />
            <h5>
              {{ input.name | upperCase }}
            </h5>
          </div>
        </div>
        <div class="outputs">
          <div
            class="output"
            v-for="output in value.outputs"
            :key="output.name"
          >
            <h5>
              {{ output.name | upperCase }}
            </h5>
            <input
              class="link"
              type="checkbox"
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
  props: ["width", "height", "value"],

  methods: {
    select(event) {
      event.action = this.value;
      this.$emit("select", event);
    },

    clickPort(event, type, port) {
      let customEvent;
      if (port.selected) {
        delete port.selected;
        customEvent = null;
      } else {
        this.value.cardWidth = this.width;
        this.value.cardHeight = this.height;
        customEvent = {
          action: this.value,
          port: port,
        };
      }

      this.$emit(`click-${type}`, customEvent);
    },
  },
};
</script>

<style scoped>
.card {
  background-color: transparent;
  height: 100%;
  width: 100%;
  padding: 0px;
  border: none;
}
.card-header {
  background-color: rgb(46, 146, 68);
  width: 100%;
  height: 40px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
  border-bottom: solid 2px rgb(46, 43, 43);
  border-top: solid 2px rgb(46, 43, 43);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-left: solid 2px rgb(46, 43, 43);
  border-right: solid 2px rgb(46, 43, 43);
}
.card-body {
  background-color: rgb(46, 146, 68);
  width: 100%;
  height: 100%;
  padding: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  border-bottom: solid 2px rgb(46, 43, 43);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-left: solid 2px rgb(46, 43, 43);
  border-right: solid 2px rgb(46, 43, 43);
}
p {
  margin: 0px;
  color: yellow;
  font-weight: 600;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.inputs {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.input {
  float: left;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.outputs {
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.output {
  float: right;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
h5 {
  margin: 0px;
  margin-left: 5px;
  margin-right: 5px;
  font-size: 12pt;
}

h5:hover {
  cursor: default;
}

input.link:hover {
  cursor: pointer;
}
</style>
