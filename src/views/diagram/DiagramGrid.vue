<template>
  <div class="crud-grid">
    <b-table :items="items" :fields="fields" :busy="isBusy" outlined>
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Carregando...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DiagramGrid",

  props: ["update"],

  created() {
    this.loadDiagrams();
  },

  data() {
    return {
      isBusy: false,
      fields: [
        {
          key: "name",
          sortable: true,
          label: "Nome",
        },
        {
          key: "description",
          sortable: true,
          label: "Descrição",
        },
        {
          key: "is_active",
        },
        {
          key: "opts",
          label: "Ações",
        },
      ],
      items: [],
    };
  },

  methods: {
    loadDiagrams() {
      this.isBusy = true;
      axios
        .get("http://localhost:8000/api/workflows")
        .then((resp) => {
          this.items = resp.data;
        })
        .catch((err) => console.log(err))
        .finally(() => (this.isBusy = false));
    },
  },

  watch: {
    update: function() {
      this.loadDiagrams();
    },
  },
};
</script>

<style scoped>
.crud-grid {
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
