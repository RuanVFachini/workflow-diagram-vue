<template>
  <g id="div-link">
    <rect
      :x="getLine().input.x1 - getLine().diff"
      :y="getLine().input.y1 - getLine().diff"
      :width="getLine().width"
      :height="getLine().height"
      :rx="getLine().rx"
      style="fill:black"
    />
    <line
      :x1="getLine().input.x1"
      :y1="getLine().input.y1"
      :x2="getLine().input.x2"
      :y2="getLine().input.y2"
      :style="getLine().styleLine"
    />
    <line
      :x1="getLine().ligature.x1"
      :y1="getLine().ligature.y1"
      :x2="getLine().ligature.x2"
      :y2="getLine().ligature.y2"
      :style="getLine().styleLine"
    />
    <line
      :x1="getLine().output.x1"
      :y1="getLine().output.y1"
      :x2="getLine().output.x2"
      :y2="getLine().output.y2"
      :style="getLine().styleLine"
    />
    <rect
      :x="getLine().output.x2 - getLine().diff"
      :y="getLine().output.y2 - getLine().diff"
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
  methods: {
    getLine() {
      const initX = document.getElementById("main-grid").getClientRects()[0].x;
      const initY = document.getElementById("main-grid").getClientRects()[0].y;

      const diff = 6.5 * this.scale;

      let calcX1 =
        this.value.input.action.x + this.value.input.posRel.x + diff + initX;
      let calcY1 =
        this.value.input.action.y + this.value.input.posRel.y + diff - initY;

      let genericOutPort = null;
      if (this.value.output) {
        genericOutPort = this.value.output;
      }

      if (this.value.alterput) {
        genericOutPort = this.value.alterput;
      }

      let calcX2 =
        genericOutPort.action.x + genericOutPort.posRel.x + diff + initX;

      let calcY2 =
        genericOutPort.action.y + genericOutPort.posRel.y + diff - initY;

      calcX1 += this.origin.x;
      calcY1 += this.origin.y;
      calcX2 += this.origin.x;
      calcY2 += this.origin.y;
      const midX = (calcX1 - calcX2) / 2;
      let outputXy = null;
      let ligatureXy = null;
      let inputXy = null;

      if (this.value.output) {
        outputXy = {
          x1: (calcX2 + midX) * this.scale,
          y1: calcY2 * this.scale,
          x2: calcX2 * this.scale,
          y2: calcY2 * this.scale,
        };

        ligatureXy = {
          x1: outputXy.x1 * this.scale,
          y1: outputXy.y1 * this.scale,
          x2: (calcX1 - midX) * this.scale,
          y2: calcY1 * this.scale,
        };

        inputXy = {
          x1: calcX1 * this.scale,
          y1: calcY1 * this.scale,
          x2: (calcX1 - midX) * this.scale,
          y2: calcY1 * this.scale,
        };
      }

      if (this.value.alterput) {
        outputXy = {
          x1: calcX2 * this.scale,
          y2: calcY2 * this.scale,
          x2: calcX2 * this.scale,
          y1: calcY1 * this.scale,
        };

        ligatureXy = {
          x1: outputXy.x1 * this.scale,
          y1: outputXy.y1 * this.scale,
          x2: outputXy.x1 * this.scale,
          y2: outputXy.y1 * this.scale,
        };

        inputXy = {
          x1: calcX1 * this.scale,
          y1: calcY1 * this.scale,
          x2: calcX2 * this.scale,
          y2: calcY1 * this.scale,
        };
      }

      return {
        input: inputXy,
        output: outputXy,
        ligature: ligatureXy,
        width: 12 * this.scale,
        height: 12 * this.scale,
        rx: 1 * this.scale,
        diff: diff,
        styleLine: "stroke:black;stroke-width:" + 4 * this.scale,
      };
    },
  },
};
</script>
