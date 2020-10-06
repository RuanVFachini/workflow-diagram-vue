<template>
  <foreignObject
    :x="cfg.x"
    :y="cfg.y"
    :width="cfg.width"
    :height="cfg.height"
  >
    <div class="panel">
      <button class="zoom-in" @click="zoomIn()"></button>
      <div class="rectangle">
        <p>{{ zoomLabel }}</p>
      </div>
      <button class="zoom-out" @click="zoomOut()"></button>
    </div>
  </foreignObject>
</template>

<script>
export default {
  name: 'PanZoomPanel',

  props: ['config', 'zoom'],

  data () {
    return {
      width: 150,
      height: 150
    }
  },
 
  computed: {
    zoomLabel: {
      get () {
        return (this.zoom * 100).toFixed(0) + '%'
      }
    },

    cfg: {
      get () {
        const configuration = {
          x: 0,
          y: 0,
          height: this.height,
          width: this.width
        }

        if (this.config) {
          if (this.config.position === '1-0') {
            configuration.x = 0
            configuration.y = 0
          } else if (this.config.position === '0-1') {
            configuration.x = 0
            configuration.y = 0
          } else if (this.config.position === '1-1') {
            configuration.x = 0
            configuration.y = 0
          }

          if (this.config.width) {
            configuration.height = this.config.width
          }

          if (this.config.height) {
            configuration.height = this.config.height
          }

          if (this.config.scale) {
            configuration.height = configuration.height * this.config.scale
            configuration.width = configuration.width * this.config.scale
          }
        }
        return configuration
      }
    }
  },

  methods: {
    zoomIn() {
      this.$emit('zoomChange', 'plus')
    },

    zoomOut() {
      this.$emit('zoomChange', 'minus')
    }
  }
}
</script>

<style scoped>
.panel {
  display: flex;
  height: 100%;
}

.zoom-in {
  background-image: url('./../assets/icons/zoom-in.svg');
  background-repeat: round;
  background-size: cover;
  width: 25%;
  height: 100%;
}

.zoom-out {
  background-image: url('./../assets/icons/zoom-out.svg');
  background-repeat: round;
  background-size: cover;
  width: 25%;
  height: 100%;
}

.rectangle {
  width: 50%;
  height: 100%;
  background-color: antiquewhite;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rectangle p {

  margin: 0px;
  text-align: center;
}
</style>