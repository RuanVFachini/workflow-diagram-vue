<template>
  <div class="crud-grid">
    <b-table :items="items" :fields="fields" :busy="isBusy" outlined>
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Carregando...</strong>
        </div>
      </template>

      <template v-slot:cell(is_active)="row">
        <b-icon
          class="act-icon"
          @click="changeStatus(row)"
          :icon="getIcon(row)"
        ></b-icon>
      </template>

      <template v-slot:cell(opts)="row">
        <b-icon class="act-icon" @click="editData(row)" icon="pencil"></b-icon>
        <b-icon class="act-icon" @click="deleteData(row)" icon="trash"></b-icon>
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
          label: "Status",
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

    getIcon(row) {
      if (row.value) {
        return "check-circle";
      }
      return "x-circle";
    },

    deleteData(row) {
      axios
        .delete(`http://localhost:8000/api/workflows/${row.item.id}`)
        .then(() => {
          let i = this.items.findIndex((i) => i.id == row.item.id);
          this.items.splice(i, 1);
        })
        .catch((err) => console.log(err));
    },

    editData(row) {
      let item = this.items.find((i) => i.id == row.item.id);
      this.$emit("edit", item);
    },

    changeStatus(row) {
      axios
        .put(`http://localhost:8000/api/workflows/${row.item.id}/change`)
        .then(() => {
          let rec = this.items.find((i) => i.id == row.item.id);
          rec.is_active = !rec.is_active;
        })
        .catch((err) => console.log(err));
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

.act-icon {
  margin-left: 5px;
  margin-right: 5px;
}

.act-icon:hover {
  cursor: pointer;
}
</style>
