<template>
  <g :id="value.id">
    <rect
      :id="value.id + '-1'"
      :x="getLine().input.x1 - 6"
      :y="getLine().input.y1 - 6"
      :width="getLine().width"
      :height="getLine().height"
      :rx="getLine().rx"
      style="fill:black"
    />
    <line
      :id="value.id + '-2'"
      :x1="getLine().input.x1"
      :y1="getLine().input.y1"
      :x2="getLine().input.x2"
      :y2="getLine().input.y2"
      :style="getLineStyle"
    />
    <line
      :id="value.id + '-3'"
      :x1="getLine().ligature.x1"
      :y1="getLine().ligature.y1"
      :x2="getLine().ligature.x2"
      :y2="getLine().ligature.y2"
      :style="getLineStyle"
    />
    <line
      :id="value.id + '-4'"
      :x1="getLine().output.x1"
      :y1="getLine().output.y1"
      :x2="getLine().output.x2"
      :y2="getLine().output.y2"
      :style="getLineStyle"
    />
    <rect
      :id="value.id + '-5'"
      :x="getLine().output.x2 - 6"
      :y="getLine().output.y2 - 6"
      :width="getLine().width"
      :height="getLine().height"
      :rx="getLine().rx"
      style="fill:black"
    />
  </g>
</template>

<script>
export default {
  name: "LinkLine",
  props: ["value", "scale", "origin"],
  computed: {
    getLineStyle() {
      let styleLine = "black";

      if (this.value.onSelection) {
        styleLine = "orange";
      }
      return "stroke:" + styleLine + ";stroke-width:" + 4 * this.scale;
    },
  },
  methods: {
    getLine() {
      let outputXy, ligatureXy, inputXy;

      let port1 = this.value.input.ref;
      let port2 = this.value.output
        ? this.value.output.ref
        : this.value.alterput.ref;

      let portInX = 19;
      let portInY = 105;

      let portOutX = 0;
      let portOutY = 0;

      if (this.value.output) {
        portOutX = 232;
        portOutY = portInY;

        let midX = 0;

        inputXy = {
          x1: port1.x + portInX,
          y1: port1.y + portInY,
          x2: 0,
          y2: port1.y + portInY,
        };

        outputXy = {
          x1: 0,
          y1: port2.y + portOutY,
          x2: port2.x + portOutX,
          y2: port2.y + portOutY,
        };

        midX = (inputXy.x1 - outputXy.x2) / 2;

        inputXy.x2 = inputXy.x1 - midX;
        outputXy.x1 = outputXy.x2 + midX;

        ligatureXy = {
          x1: inputXy.x2,
          y1: inputXy.y2,
          x2: outputXy.x1,
          y2: outputXy.y1,
        };
      } else {
        portOutX = 125;
        portOutY = 133;

        let midX = 0;

        inputXy = {
          x1: port1.x + portInX,
          y1: port1.y + portInY,
          x2: 0,
          y2: port1.y + portInY,
        };

        outputXy = {
          x1: port2.x + portOutX,
          y1: 0,
          x2: port2.x + portOutX,
          y2: port2.y + portOutY,
        };

        midX = inputXy.x1 - outputXy.x2;
        inputXy.x2 = inputXy.x1 - midX;

        outputXy.y1 = inputXy.y1;

        ligatureXy = {
          x1: inputXy.x2,
          y1: inputXy.y2,
          x2: inputXy.x2,
          y2: inputXy.y2,
        };
      }

      inputXy.x1 = (inputXy.x1 + this.origin.x) * this.scale;
      inputXy.x2 = (inputXy.x2 + this.origin.x) * this.scale;
      inputXy.y1 = (inputXy.y1 + this.origin.y) * this.scale;
      inputXy.y2 = (inputXy.y2 + this.origin.y) * this.scale;

      outputXy.x1 = (outputXy.x1 + this.origin.x) * this.scale;
      outputXy.x2 = (outputXy.x2 + this.origin.x) * this.scale;
      outputXy.y1 = (outputXy.y1 + this.origin.y) * this.scale;
      outputXy.y2 = (outputXy.y2 + this.origin.y) * this.scale;

      ligatureXy.x1 = (ligatureXy.x1 + this.origin.x) * this.scale;
      ligatureXy.x2 = (ligatureXy.x2 + this.origin.x) * this.scale;
      ligatureXy.y1 = (ligatureXy.y1 + this.origin.y) * this.scale;
      ligatureXy.y2 = (ligatureXy.y2 + this.origin.y) * this.scale;

      return {
        input: inputXy,
        output: outputXy,
        ligature: ligatureXy,
        width: 12 * this.scale,
        height: 12 * this.scale,
        rx: 1 * this.scale,
      };
    },
  },
};
</script>
