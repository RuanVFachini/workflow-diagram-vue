<template>
  <Diagram :paramActs="actions" />
</template>

<script>
import Diagram from "../../components/Diagram";
export default {
  name: "Home",
  components: {
    Diagram,
  },

  data() {
    return {
      actions: [],
    };
  },
};
</script>
