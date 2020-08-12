<template>
  <div class="crud-form">
    <h3></h3>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group>
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          required
          placeholder="Nome"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          id="input-2"
          v-model="form.description"
          required
          placeholder="Descricao"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Salvar</b-button>
      <b-button class="ml-2" type="reset" variant="danger">Limpar</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import clone from "lodash/clone";

export default {
  name: "DiagramForm",
  data() {
    return {
      form: {
        id: null,
        name: "",
        description: "",
        is_active: true,
        actions: [],
      },
      show: true,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const cloneData = clone(this.form);
      cloneData.actions = JSON.stringify(cloneData.actions);
      const data = JSON.stringify(cloneData);
      axios
        .post("http://localhost:8000/api/workflows", data)
        .then(() => {
          this.$emit("saved");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.crud-form {
  width: 300px;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
