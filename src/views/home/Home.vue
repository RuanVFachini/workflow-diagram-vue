<template>
  <div class="main-content">
    <b-card class="info-card" title="Acessando os Diagramas" :img-src="getImages.menu" img-alt="Image" img-top>
      <b-card-text>
        Acesse o cadastro de diagramas clicando no menu superior da página
      </b-card-text>
    </b-card>
    <b-card class="info-card" title="Criando um Diagrama" :img-src="getImages.new" img-alt="Image" img-top>
      <b-card-text>
        Cadastre o novo diagrama no formulário do lado esquerdo da tela.
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},

  data() {
    return {
      actions: [],
    };
  },

  computed: {
    getImages: {
      get () {
        return {
          menu: require('../../assets/img/menu_navbar.png'),
          new: require('../../assets/img/novo_diagrama.png')
        }
      }
    }
  }
};
</script>

<style scoped>

.card-deck {
  max-width: 100%;
  margin: 0px;
}

.main-content {
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.info-card{
  max-width: 300px;
  min-width: 250;
  height: 450px;
  border: 1px solid rgb(166, 166, 172);
  box-shadow: 8px 15px #b8b5b5;
}

</style>
