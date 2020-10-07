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
        <p :style="cfg.style">{{ zoomLabel }}</p>
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
      height: 150,
      fontSize: 16,
      svgPadding: 10
    }
  },

  computed: {
    mainGridSize: {
      get () {
        const element = document.getElementById('main-grid')
        return {
          wigth: element.width.animVal.value,
          height: element.height.animVal.value
        }
      }
    },

    zoomLabel: {
      get () {
        return (this.zoom * 100).toFixed(0) + '%'
      }
    },

    cfg: {
      get () {
        let fontSizeTemp = this.fontSize
        let configuration = {
          x: this.svgPadding,
          y: this.svgPadding,
          height: this.height,
          width: this.width,
          style: ''
        }

        if (this.config) {
          if (this.config.width) {
            configuration.height = this.config.width
          }

          if (this.config.height) {
            configuration.height = this.config.height
          }

          if (this.config.scale) {
            configuration.height = configuration.height * this.config.scale
            configuration.width = configuration.width * this.config.scale
            fontSizeTemp = fontSizeTemp * this.config.scale
            configuration.style = `font-size: ${fontSizeTemp}px;`
          }

          if (this.config.position === '1-0') {
            configuration.x = (this.mainGridSize.wigth - configuration.width - this.svgPadding)
            configuration.y = this.svgPadding
          } else if (this.config.position === '0-1') {
            configuration.x = this.svgPadding
            configuration.y = (this.mainGridSize.height - configuration.height - this.svgPadding)
          } else if (this.config.position === '1-1') {
            configuration.x = (this.mainGridSize.wigth - configuration.width - this.svgPadding)
            configuration.y = (this.mainGridSize.height - configuration.height - this.svgPadding)
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
  opacity: .3;
  transition: opacity 1s;
}

.panel:hover {
  display: flex;
  height: 100%;
  opacity: .8;
  transition: opacity 1s;
}

.zoom-in {
  background-image: url('./../assets/icons/zoom-in.svg');
  background-repeat: round;
  background-size: cover;
  border: 1px solid lightslategray;
  width: 25%;
  height: 100%;
}

.zoom-out {
  background-image: url('./../assets/icons/zoom-out.svg');
  background-repeat: round;
  background-size: cover;
  border: 1px solid lightslategray;
  width: 25%;
  height: 100%;
}

.rectangle {
  width: 50%;
  height: 100%;
  background-color: antiquewhite;
  border: 1px solid lightslategray;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rectangle p {
  margin: 0px;
  text-align: center;
}
</style>