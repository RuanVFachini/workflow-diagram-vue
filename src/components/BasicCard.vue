<script>
export default {
  name: "BasicCard",
  props: ["width", "height", "value", "scale", "origin"],

  methods: {
    inputStyle() {
      return {
        width: 13 * this.scale + "px",
        height: 13 * this.scale + "px",
      };
    },

    alterputStyle() {
      return {
        width: 13 * this.scale + "px",
        height: 13 * this.scale + "px",
      };
    },

    styleH5() {
      return {
        margin: "0px",
        "margin-left": 5 * this.scale + "px",
        "margin-right": 5 * this.scale + "px",
        "font-size": 10 * this.scale + "pt",
      };
    },

    styleP() {
      return {
        "font-size": 10 * this.scale + "pt",
        margin: "0px",
        color: "black",
        "font-weight": 600 * this.scale,
        "font-family":
          "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande','Lucida Sans Unicode', Geneva, Verdana, sans-serif",
      };
    },

    cardHeaderStyle() {
      return {
        "background-color": "rgb(255, 255, 255)",
        width: "100%",
        height: 40 * this.scale + "px",
        padding: "0px",
        display: "flex",
        "flex-direction": "column",
        "justify-content": "space-around",
        "align-content": "center",
        "border-bottom": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
        "border-top": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
        "border-top-left-radius": 5 * this.scale + "px",
        "border-top-right-radius": 5 * this.scale + "px",
        "border-left": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
        "border-right": "solid " + 2 * this.scale + "px rgb(46, 43, 43)",
      };
    },

    cardBodyStyle() {
      return {
        backgroundColor: "gray",
        width: "100%",
        height: "100%",
        padding: "0px",
        display: "flex",
        "flex-direction": "row",
        "justify-content": "space-between",
        "align-content": "center",
      };
    },

    cardParams() {
      let posX = this.value.x + this.origin.x;
      let posY = this.value.y + this.origin.y;
      return {
        ref: this.value,
        x: posX * this.scale,
        y: posY * this.scale,
        width: this.width * this.scale,
        height: this.height * this.scale,
        scale: "transform: scale(" + this.scale + ")",
      };
    },

    select(event) {
      event.action = this.value;
      this.$emit("select", event);
    },

    clickPort(event, type, port) {
      let relX = event.target.getClientRects()[0].x - this.value.x;
      let relY = event.target.getClientRects()[0].y - this.value.y;

      relX -= this.origin.x;
      relY -= this.origin.y;

      const customEvent = {
        action: this.value,
        port: port,
        posRel: {
          x: relX,
          y: relY,
        },
      };
      this.$emit(`click-${type}`, customEvent);
    },
  },
};
</script>
