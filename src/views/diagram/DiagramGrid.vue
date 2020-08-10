<template>
  <p>Listagem</p>
</template>

<script>
export default {
  name: "DiagramGrid",

  created() {
    this.loadDiagrams();
  },

  data() {
    return {
      items: [],
    };
  },

  methods: {
    loadDiagrams() {},
  },
};
</script>
