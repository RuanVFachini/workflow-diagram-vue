<template>
  <div class="list-ligatures">
    <div class="p-2">
      <h2>Ligatures</h2>
    </div>
    <b-list-group v-for="link in values" :key="link.id" class="pl-2 pr-2">
      <b-list-group-item
        variant="success"
        class="list-item-custom"
        draggable="true"
        @dragstart="setRef($event)"
        @dragend.prevent="checkDrop($event, link.id)"
        @mouseenter="$emit('in-ligature', link.id)"
        @mouseleave="$emit('out-ligature', link.id)"
        @click="click"
      >
        <div
          class="group-list-link"
          v-b-tooltip.hover.left="'Drop out to delete link'"
        >
          <p class="item-list-link">
            {{ getOutputDescription(link) | limitSize }}
          </p>
          <p class="arrow-icon-list">
            <b-icon-arrow-right-square-fill
              scale="1.5"
              variant="info"
            ></b-icon-arrow-right-square-fill>
          </p>
          <p class="item-list-link">
            {{ link.input.ref.description | limitSize }}
          </p>
        </div>
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

    click() {
      console.log(this.values);
    },

    checkDrop(event, id) {
      if (event.x < this.refToDropItem - 200) {
        this.$emit("drop-item", id);
      }
    },

    getOutputDescription(link) {
      if (link.output) {
        return link.output.ref.description;
      }
      return link.alterput.ref.description;
    },
  },
};
</script>

<style scoped>
div.list-ligatures {
  width: 400px;
}
.list-item-custom {
  height: 40px;
  padding: 0;
  margin-top: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
}
.group-list-link {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
}

.item-list-link {
  font-size: 20px;
  margin: 0px;
}

.arrow-icon-list {
  height: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

h2 {
  font-size: 14pt;
}
</style>
