<template>
  <div class="crud-form">
    <h4 class="mt-3 mb-2">Novo Diagrama</h4>
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
import clone from "lodash/clone";
import { mapMutations } from 'vuex';

export default {
  name: "DiagramForm",

  created () {
    this.loadDefaults()
  },

  data () {
    return {
      form: {
        id: null,
        name: "",
        description: "",
        is_active: true,
        data: [],
      },
      show: true,
    };
  },
  methods: {
    ...mapMutations(['addDiagram']),

    onSubmit(evt) {
      evt.preventDefault();
      const cloneData = clone(this.form);
      this.addDiagram(cloneData);
      this.loadDefaults();
    },

    loadDefaults () {
      this.form = {
        id: null,
        name: "",
        description: "",
        is_active: true,
        data: [],
      }
    }
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
