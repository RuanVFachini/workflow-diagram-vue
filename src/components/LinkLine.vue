<template>
  <g id="div-link">
    <rect
      :x="getLine().x1 - getLine().diff"
      :y="getLine().y1 - getLine().diff"
      :width="getLine().width"
      :height="getLine().height"
      :rx="getLine().rx"
      style="fill:black"
    />
    <line
      :x1="getLine().x1"
      :y1="getLine().y1"
      :x2="getLine().x2"
      :y2="getLine().y2"
      :style="getLine().styleLine"
    />
    <rect
      :x="getLine().x2 - getLine().diff"
      :y="getLine().y2 - getLine().diff"
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

      let calcX2 =
        this.value.output.action.x + this.value.output.posRel.x + diff + initX;

      let calcY2 =
        this.value.output.action.y + this.value.output.posRel.y + diff - initY;

      calcX1 += this.origin.x;
      calcY1 += this.origin.y;
      calcX2 += this.origin.x;
      calcY2 += this.origin.y;

      return {
        x1: calcX1 * this.scale,
        y1: calcY1 * this.scale,
        x2: calcX2 * this.scale,
        y2: calcY2 * this.scale,
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
