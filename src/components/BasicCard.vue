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
        margin: "0 auto",
        color: "black",
        width: "fit-content",
        maxWidth: "50%",
        cursor: "pointer",
        "font-weight": 600 * this.scale,
        "font-family":
          "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande','Lucida Sans Unicode', Geneva, Verdana, sans-serif",
      };
    },

    cardHeaderStyle() {
      return {
        "background-color": "rgb(255, 255, 255)",
        width: "100%",
        height: 50 * this.scale + "px",
        padding: "0px",
        display: "flex",
        "flex-direction": "column",
        "justify-content": "space-around",
        "align-content": "center",
        "border-bottom": "solid " + 1 * this.scale + "px rgb(46, 43, 43)",
        "border-top": "solid " + 1 * this.scale + "px rgb(46, 43, 43)",
        "border-top-left-radius": 5 * this.scale + "px",
        "border-top-right-radius": 5 * this.scale + "px",
        "border-left": "solid " + 1 * this.scale + "px rgb(46, 43, 43)",
        "border-right": "solid " + 1 * this.scale + "px rgb(46, 43, 43)",
      };
    },

    cardBodyStyle() {
      return {
        backgroundColor: "#ffcc66",
        width: "100%",
        height: "100%",
        padding: "0px",
        display: "flex",
        "flex-direction": "row",
        "justify-content": "space-between",
        "align-content": "center",
        "border-bottom": 1 * this.scale + "px solid black",
        "border-left": 1 * this.scale + "px solid black",
        "border-right": 1 * this.scale + "px solid black",
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
  },
};
</script>
