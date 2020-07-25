<template>
  <div class="list-ligatures">
    <div class="p-2">
      <h2>Ligações</h2>
    </div>
    <b-list-group v-for="link in values" :key="link.id" class="pl-2 pr-2">
      <b-list-group-item
        variant="success"
        class="list-item-custom"
        draggable="true"
        @dragstart="setRef($event)"
        @dragend.prevent="checkDrop($event, link.id)"
      >
        <h5>
          {{
            link.output ? link.output.action.name : link.alterput.action.name
          }}
          &#8594; {{ link.input.action.name }}
        </h5>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "LigaturesMap",

  props: ["values"],

  data() {
    return {
      refToDropItem: 0,
    };
  },

  methods: {
    setRef(event) {
      this.refToDropItem = event.x;
    },

    getLinkDescription(link) {
      let defaultPut;
      if (link.output) {
        defaultPut = link.output;
      }
      if (link.alterput) {
        defaultPut = link.alterput;
      }
      return (
        link.input.action.name + " " + "&#8594;" + " " + defaultPut.action.name
      );
    },

    checkDrop(event, id) {
      if (event.x < this.refToDropItem - 200) {
        this.$emit("drop-item", id);
      }
    },
  },
};
</script>

<style scoped>
div.list-ligatures {
  width: 250px;
}
.list-item-custom {
  height: 30px;
  padding: 0;
  margin-top: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
}
h5 {
  font-size: 10pt;
  margin: 0px;
}

h2 {
  font-size: 14pt;
}
</style>
