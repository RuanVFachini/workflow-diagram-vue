<template>
  <foreignObject
    :x="position().x"
    :y="position().y"
    :width="width"
    :height="height"
  >
    <div class="edit-title">
      <input v-model="titleText" />
      <button @click="$emit('cancel')" class="btn-cancel">Cancel</button>
      <button @click="saveTitleEdition" class="btn-save">Save</button>
    </div>
  </foreignObject>
</template>

<script>
export default {
  name: "FormEditTitle",
  props: {
    card: {
      type: Object,
      required: true,
    },
    scale: {
      type: Number,
      required: true,
    },
    origin: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      title: "",
      width: 350,
      height: 40,
    };
  },

  computed: {
    titleText: {
      get() {
        return this.card.title;
      },

      set(value) {
        this.title = value;
      },
    },
  },

  created() {
    this.titleText = this.card.title;
  },

  methods: {
    position() {
      const xCoords = this.card.x + this.origin.x;
      const yCoords = this.card.y + this.origin.y;
      return {
        x: xCoords * this.scale,
        y: yCoords * this.scale - 50,
      };
    },

    saveTitleEdition() {
      this.card.title = this.title;
      this.$emit("changed");
    },
  },
};
</script>

<style>
.edit-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2px;
  background-color: rgb(212, 230, 230);
}

.btn-cancel {
  background-color: rgb(228, 70, 70);
  color: white;
}

.btn-save {
  background-color: rgb(103, 110, 219);
  color: white;
}
</style>
