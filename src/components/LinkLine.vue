<template>
  <g :id="value.id" class="line-group">
    <rect
      v-for="rect in getLines().rects" 
      :key="rect.id"
      :id="rect.id"
      :x="rect.x"
      :y="rect.y"
      :width="rect.width"
      :height="rect.height"
      style="fill:black"
    />
    <line
      v-for="line in getLines().lines" 
      :key="line.id"
      :id="line.id"
      :x1="line.x1"
      :y1="line.y1"
      :x2="line.x2"
      :y2="line.y2"
      :style="getLineStyle"
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
        styleLine = "yellow";
      }
      return "stroke:" + styleLine + ";stroke-width:" + 2 * this.scale;
    },
  },
  methods: {
    getLines() {
      let outputXy, ligatureXy, inputXy;
      let port1 = this.value.input.ref;
      let port2 = this.value.output
        ? this.value.output.ref
        : this.value.alterput.ref;
      let portInX = 18;
      let portInY = 105;
      let portOutX = 0;
      let portOutY = 0;
      let midX = 0;
      let diffPoint = 6 * this.scale;
      const size = 12 * this.scale;

      if (this.value.output) {
        portOutX = 232;
        portOutY = portInY;

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
        portOutY = 135;

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
      inputXy.id = this.value.id + '-1'

      outputXy.x1 = (outputXy.x1 + this.origin.x) * this.scale;
      outputXy.x2 = (outputXy.x2 + this.origin.x) * this.scale;
      outputXy.y1 = (outputXy.y1 + this.origin.y) * this.scale;
      outputXy.y2 = (outputXy.y2 + this.origin.y) * this.scale;
      outputXy.id = this.value.id + '-2'

      ligatureXy.x1 = (ligatureXy.x1 + this.origin.x) * this.scale;
      ligatureXy.x2 = (ligatureXy.x2 + this.origin.x) * this.scale;
      ligatureXy.y1 = (ligatureXy.y1 + this.origin.y) * this.scale;
      ligatureXy.y2 = (ligatureXy.y2 + this.origin.y) * this.scale;
      ligatureXy.id = this.value.id + '-3'

      const rectInput = {
        x: inputXy.x1 - diffPoint,
        y: inputXy.y1 - diffPoint,
        width: size,
        height: size,
        id: this.value.id + '-4'
      };

      const rectOutput = {
        x: outputXy.x2 - diffPoint,
        y: outputXy.y2 - diffPoint,
        width: size,
        height: size,
        id: this.value.id + '-5'
      };

      return {
        lines: [inputXy, outputXy, ligatureXy],
        rects: [rectInput, rectOutput]
      };
    },
  },
};
</script>

<style scoped>
.line-group {
  pointer-events: none;
}
</style>
