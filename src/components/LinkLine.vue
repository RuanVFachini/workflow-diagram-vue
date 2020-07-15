<template>
    <line
        :x1="getP1Node.x" 
        :y1="getP1Node.y" 
        :x2="getP2Node.x" 
        :y2="getP2Node.y" 
        :style="lineStyle"/>
</template>

<script>
export default {
  name: 'LinkLine',
  props: ['p1','p2','width','height'],

  computed: {
    getP1Coordenadas() {

      return {
        x: this.p1.x + (this.width/2),
        y: this.p1.y + (this.height/2)
      }
    },
    getP2Coordenadas() {
      return {
        x: this.p2.x + (this.width/2),
        y: this.p2.y + (this.height/2)
      }
    },

    getP1Node() {
      const midwidth = (this.width / 2)
      // const midheight = (this.height / 2)
      const p1Coor = this.getP1Coordenadas
      const p2Coor = this.getP2Coordenadas
      const node = {}
      if(p1Coor.x < p2Coor.x) {
        node.x = p1Coor.x + midwidth
      } else {
        node.x = p1Coor.x - midwidth
      }
      node.y = p1Coor.y
      return node
    },

    getP2Node() {
      const midwidth = (this.width / 2)
      // const midheight = (this.height / 2)
      const p1Coor = this.getP1Coordenadas
      const p2Coor = this.getP2Coordenadas
      const node = {}
      if(p1Coor.x < p2Coor.x) {
        node.x = p2Coor.x - midwidth
      } else {
        node.x = p2Coor.x + midwidth
      }
      node.y = p2Coor.y
      return node
    },

    getInputArrow() {
      const p1Coor = this.getP1Node
      // const p2Coor = this.getP2Node
      const p1X = p1Coor.x
      const p1Y = p1Coor.y
      const p2X = p1Coor.x
      const p2Y = p1Coor.y
      const p3X = p1Coor.x
      const p3Y = p1Coor.y
      
      return `${p1X},${p1Y} ${p2X},${p2Y} ${p3X},${p3Y}`
    },

    lineStyle() {
      if (this.p2.level == 'principal') {
        return "stroke:blue;stroke-width:4"
      } else if (this.p2.level == 'alternativo') {
        return "stroke:green;stroke-width:4"
      }
      return "stroke:yellow;stroke-width:4"
      
    }
  }
}
</script>
