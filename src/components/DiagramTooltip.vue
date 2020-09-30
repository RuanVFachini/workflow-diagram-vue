<template>
  <foreignObject
    :x="tooltipPosition.x"
    :y="tooltipPosition.y"
    :width="cardWidth"
    :height="100"
  >
    <div class="diagram-tooltip">
      <span class="diagram-tooltiptext">{{ message }}</span>
    </div>
  </foreignObject>
</template>
<script>
export default {
  name: "diagram-tooltip",
  props: {
    message: {
      type: String,
      required: true,
    },
    action: {
      type: Object,
      required: true,
    },
    cardWidth: {
      type: Number,
      required: true,
    },
    cardHeight: {
      type: Number,
      required: true,
    },
  },
  computed: {
    tooltipPosition() {
      return {
        x: this.action.x,
        y: this.action.y + this.cardHeight + 10,
      };
    },
  },
};
</script>
<style scoped>
/* Tooltip container */
.diagram-tooltip {
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  text-align: center;
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
}

/* Tooltip text */
.diagram-tooltip .diagram-tooltiptext {
  width: 120px;
  color: #fff;
  text-align: center;
}
</style>
