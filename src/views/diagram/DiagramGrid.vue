<template>
  <div class="crud-grid">
    <b-table :items="diagrams" :fields="fields" :busy="isBusy" outlined>
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
        <b-icon class="act-icon" @click="deleteDiagram(row)" icon="trash"></b-icon>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters, mapMutations} from 'vuex'

export default {
  name: "DiagramGrid",

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
    };
  },

  computed: {
    diagrams: {
      get () {
        return this.getDiagrams
      },

      set (value) {
        this.setDiagrams(value)
      }
    },
    ...mapGetters(['getDiagrams']),
  },

  methods: {
    ...mapMutations(['setDiagrams', 'changeStatus', 'deleteDiagram']),

    getIcon(row) {
      if (row.value) {
        return "check-circle";
      }
      return "x-circle";
    },

    editData(row) {
      let item = this.diagrams.find((i) => i.id == row.item.id);
      this.$emit("edit", item);
    },
  }
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
