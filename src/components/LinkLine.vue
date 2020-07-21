<template>
  <g id="div-link">
    <rect
      :x="getLinePos().x1 - 6.5"
      :y="getLinePos().y1 - 6.5"
      width="13"
      height="13"
      rx="1"
      style="fill:black"
    />
    <line
      :x1="getLinePos().x1"
      :y1="getLinePos().y1"
      :x2="getLinePos().x2"
      :y2="getLinePos().y2"
      style="stroke:black;stroke-width:4"
    />
    <rect
      :x="getLinePos().x2 - 6.5"
      :y="getLinePos().y2 - 6.5"
      width="13"
      height="13"
      rx="1"
      style="fill:black"
    />
  </g>
</template>

<script>
export default {
  name: "LinkLine",
  props: ["value"],
  methods: {
    getLinePos() {
      console.log(this.value.input.action.y);

      let calcX1 = this.value.input.action.x + this.value.input.posRel.x + 6.5;
      let calcY1 = this.value.input.action.y + this.value.input.posRel.y + 6.5;

      let calcX2 =
        this.value.output.action.x + this.value.output.posRel.x + 6.5;

      let calcY2 =
        this.value.output.action.y + this.value.output.posRel.y + 6.5;

      return {
        x1: calcX1,
        y1: calcY1,
        x2: calcX2,
        y2: calcY2,
      };
    },
  },
};
</script>
