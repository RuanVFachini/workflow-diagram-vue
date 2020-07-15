<template>
  <div id="app">
      <svg id="main-grid" @mousewheel.prevent="zoom($event)" @mousedown.prevent="panViewStart($event)" @mousemove.prevent="panViewMove($event)" @mouseup.prevent="unselect"> 
        <g id="main-svg-pan" :transform="getSvgPosition">
          <g id="main-svg-zoom">
          <foreignObject 
            v-for="action in actions" 
            :key="action.actionName" 
            :x="action.x" 
            :y="action.y" 
            :width="cardwidth" 
            :height="cardheight" 
            @mousedown.prevent="select($event,action.actionName)" 
            @mousemove="move($event)" 
            @mouseup="unselect"
            @mouseleave="unselect"
            @dblclick="openEdit(action.actionName)"
            >
              <b-card
                :title="action.actionName"
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
                draggable="false"
              >
                <b-card-text>
                  {{action.actionType}}
                </b-card-text>

                <b-button variant="" style="float:left;" @click="setInput(action.actionName)">Entrada</b-button>
                <b-button variant="primary" style="float:right;" class="ml-2" @click="setOutput('principal', action.actionName)">Saida</b-button>
                <b-button variant="success" style="float:right;" @click="setOutput('alternativo', action.actionName)">Alternativo</b-button>
              </b-card>
          </foreignObject>
          <LinkLine v-for="link in links" :key="link.id" :p1="link.input" :p2="link.output" :width="cardwidth" :height="cardheight"/>
          </g>
        </g>
      </svg>
  </div>
</template>


<script>
import LinkLine from "./components/LinkLine"

export default {
  name: 'App',
  components: {
    LinkLine
  },
  data() {
    return {
      cardwidth: 316,
      cardheight: 210,
      actions: [{
        actionName: "busca-ids-integracao1",
        actionType: "br.com.senior.plutaoapp.workflow.actions.ExecuteQueryDatabaseAction",
        x: 50,
        y: 50
      },{
        actionName: "busca-ids-integracao2",
        actionType: "br.com.senior.plutaoapp.workflow.actions.ExecuteQueryDatabaseAction",
        x: 50,
        y: 50
      },{
        actionName: "busca-ids-integracao3",
        actionType: "br.com.senior.plutaoapp.workflow.actions.ExecuteQueryDatabaseAction",
        x: 50,
        y: 50
      },{
        actionName: "busca-ids-integracao4",
        actionType: "br.com.senior.plutaoapp.workflow.actions.ExecuteQueryDatabaseAction",
        x: 50,
        y: 50
      },{
        actionName: "busca-ids-integracao5",
        actionType: "br.com.senior.plutaoapp.workflow.actions.ExecuteQueryDatabaseAction",
        x: 50,
        y: 50
      }],
      links:[],
      prevPos: null,
      onMove: null,
      stage: {
        input: null,
        output: null
      },
      scale: 1,
      prevPanPos: null,
      svg: {
        x: 0,
        y: 0
      }
    }
    
  },

  methods: {

    openEdit(actionName) {
      alert(actionName)
    },

    select (event, actionName) {
      if (event.button !== 0) {
        return 
      }
      this.onMove = this.actions.find(x => x.actionName == actionName)
      this.prevPos = {
        x : event.x,
        y : event.y
      }
    },

    unselect () {
      this.onMove = null
      this.onPan = false
    },

    move (event) {
      if (this.onMove == null) {
        return
      }
      const speed = 1 / this.scale
      this.onMove.x  += (event.x - this.prevPos.x) * speed
      this.onMove.y  += (event.y - this.prevPos.y) * speed

      this.prevPos.x = event.x
      this.prevPos.y = event.y
    },

    setInput(actionName) {
      this.stage.input = this.actions.find(x => x.actionName == actionName)
      this.checkLink()
    },

    setOutput(level, actionName) {
      const action = this.actions.find(x => x.actionName == actionName)
      action.level = level
      this.stage.output = action
      this.checkLink()
    },

    checkLink() {
      if (this.stage.input && this.stage.output) {
        this.links.push({
          id: 'link' + this.links.length + 1,
          input: this.stage.input,
          output: this.stage.output
        }),
        this.stage.input = null
        this.stage.output = null
      }
    },

    zoom(event) {
      if (event.wheelDelta > 0 && this.scale < 1) {
        this.scale += 0.1
      }else if (event.wheelDelta < 0 && this.scale > 0.3) {
        this.scale -= 0.1
      }
      const svgZoom = document.getElementById("main-svg-zoom");
      svgZoom.style.transform = `scale(${this.scale})`;
    },

    panViewStart(event) {
      if (event.button !== 1 && event.buttons !== 4) {
        return
      }
      this.onPan = true
      this.prevPanPos = {
        x : event.x,
        y : event.y
      }
    },

    panViewMove(event) {
      if (!this.onPan) {
        return
      }

      this.svg.x  += event.x - this.prevPanPos.x
      this.svg.y  += event.y - this.prevPanPos.y

      this.prevPanPos = {
        x : event.x,
        y : event.y
      }
    }
  },

  computed: {
    getSvgPosition() {
      return `translate(${this.svg.x},${this.svg.y})`
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

#main-grid {
  width: 100%;
  height: 100%;
}
</style>
