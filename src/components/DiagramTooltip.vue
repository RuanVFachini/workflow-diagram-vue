<template>
  <foreignObject :x="position.x" :y="position.y" :width="position.width" :height="position.height">
    <div class="container">
      <div class="content">{{ message }}</div>
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
    position: {
      type: Object,
      required: true,
    },
  },
};
</script>