<template>
  <div id="main-container">
    <div class="diagram-menu">
      <b-nav class="p-1">
        <b-list-group>
          <b-list-group-item @click="trasnlateToInit">
            Inicio
          </b-list-group-item>
          <b-list-group-item @click="Clear">
            Limpar
          </b-list-group-item>
          <b-list-group-item draggable="true" @dragend="dropNew($event, 0)">
            Two Ways
          </b-list-group-item>
          <b-list-group-item draggable="true" @dragend="dropNew($event, 1)">
            Three Ways
          </b-list-group-item>
          <b-list-group-item draggable="true" @dragend="dropNew($event, 2)">
            Single Way In
          </b-list-group-item>
          <b-list-group-item draggable="true" @dragend="dropNew($event, 3)">
            Single Way Out
          </b-list-group-item>
        </b-list-group>
      </b-nav>
    </div>
    <div class="body-container">
      <div class="body-center">
        <slot></slot>
        <svg
          id="main-grid"
          @mousedown.prevent="mouseDown($event)"
          @mousemove.prevent="mouseMove($event)"
          @mouseleave.prevent="unselect"
          @mouseup.prevent="unselect"
          @mousewheel="zoom"
        >
          <DiagramCard
            v-for="action in actions"
            :key="action.name"
            :value="action"
            :scale="scale"
            :origin="svg"
            :height="cardHeight"
            :width="cardWidth"
            @move="move($event)"
            @select="select($event)"
            @remove="removeAction"
            @edit="$emit('edit-item', $event)"
            @unselect="unselect"
            @click-port="setSelectedPort"
          />
          <LinkLine
            v-for="link in links"
            :key="link.id"
            :value="link"
            :scale="scale"
            :origin="svg"
            @select-line="setSelectedLine($event)"
          />
        </svg>
      </div>
      <LigaturesMap
        :values="links"
        @drop-item="dropLink($event)"
        @in-ligature="inLigature($event)"
        @out-ligature="outLigature($event)"
      />
    </div>
  </div>
</template>

<script>
import DiagramCard from "./DiagramCard";
import LinkLine from "./LinkLine";
import LigaturesMap from "./LigaturesMap";

export default {
  name: "Diagram",

  props: ["actions"],

  components: {
    DiagramCard,
    LinkLine,
    LigaturesMap,
  },

  model: {
    prop: "actions",
    event: "change",
  },

  data() {
    return {
      links: [],
      cardWidth: 250,
      cardHeight: 150,
      prevPos: null,
      onMove: null,
      stage: [],
      scale: 1,
      prevPanPos: null,
      svg: {
        x: 0,
        y: 0,
      },
      selectedLine: null,
      midleMouseBtnPress: false,
    };
  },

  methods: {
    Clear() {
      this.actions = [];
      this.links = [];
    },

    removeAction(action) {
      let index = this.getActionIdByName(action.name);
      this.actions.splice(index, 1);
    },

    getActionIdByName(name) {
      return this.actions.findIndex((act) => act.name == name);
    },

    inLigature(event) {
      this.changeColorLinkLine(event, "black", "red");
    },

    outLigature(event) {
      this.changeColorLinkLine(event, "red", "black");
    },

    changeColorLinkLine(event, oldValue, newValue) {
      for (let i = 1; i <= 5; i++) {
        const idElement = event + "-" + i;
        let element = document.getElementById(idElement);
        let style = element.getAttribute("style");
        style = style.replace(oldValue, newValue);
        element.setAttribute("style", style);
      }
    },

    dropNew(event, type) {
      const midX = this.cardWidth / 2;
      const midY = this.cardHeight / 2;
      this.Add(event.x - midX, event.y - midY, type);
    },

    Add(paramX, paramY, type) {
      const newAct = {
        title: "nova ação",
        description: "Nova ação criada",
        name: this.findAvaliableName(),
        x: paramX,
        y: paramY,
      };

      if (type === 0) {
        newAct.input = {};
        newAct.output = {};
        newAct.alterput = false;
      }

      if (type === 1) {
        newAct.input = {};
        newAct.output = {};
        newAct.alterput = {};
      }

      if (type === 2) {
        newAct.input = {};
        newAct.alterput = false;
        newAct.output = false;
      }

      if (type === 3) {
        newAct.output = {};
        newAct.input = false;
        newAct.alterput = false;
      }

      newAct.x = newAct.x > 0 ? newAct.x : 0;
      newAct.y = newAct.y > 0 ? newAct.y : 0;

      this.actions.push(newAct);
    },

    setSelectedLine(event) {
      this.selectedLine = event;
    },

    dropLink(event) {
      const index = this.links.findIndex((l) => l.id == event);
      this.removeActionLink(this.links[index]);
      this.links.splice(index, 1);
    },

    removeActionLink(relationship) {
      console.log(relationship);
    },

    findAvaliableName() {
      let exists = 1;
      let count = 0;
      let name = "";
      while (exists >= 0) {
        name = "new-action-" + count;
        exists = this.actions.findIndex((act) => act.name === name);
        count++;
      }
      return name;
    },

    select(event) {
      if (event.button !== 0) {
        return;
      }
      this.onMove = event.action;
      this.onMove.select = true;
      this.prevPos = {
        x: event.x,
        y: event.y,
      };
    },

    unselect() {
      if (this.onMove && this.onMove.select) {
        this.onMove.select = false;
      }

      this.onMove = null;
      this.onPan = false;
    },

    move(event) {
      if (this.onMove == null) {
        return;
      }
      this.moveAction(event);
      this.prevPos.x = event.x;
      this.prevPos.y = event.y;
    },

    moveAction(event) {
      const speed = 1 / this.scale;
      let valueX = (event.x - this.prevPos.x) * speed;
      let valueY = (event.y - this.prevPos.y) * speed;
      if (this.onMove.x + valueX <= 0) {
        this.onMove.x = 0;
      } else {
        this.onMove.x += valueX;
      }
      if (this.onMove.y + valueY <= 0) {
        this.onMove.y = 0;
      } else {
        this.onMove.y += valueY;
      }
    },

    setSelectedPort(event, type) {
      this.stage[type] = event;
      this.checkLink();
    },

    checkLink() {
      if (this.stage) {
        if (
          this.stage.input &&
          this.stage.output &&
          !this.findLink(this.stage, "O")
        ) {
          const link = {
            id: this.getLinkId(),
            input: this.stage.input,
            output: this.stage.output,
          };

          this.links.push(link);
          this.stage = [];
        } else if (
          this.stage.input &&
          this.stage.alterput &&
          !this.findLink(this.stage, "A")
        ) {
          const link = {
            id: this.getLinkId(),
            input: this.stage.input,
            alterput: this.stage.alterput,
          };

          this.links.push(link);
          this.stage = [];
        }
      }
    },

    getLinkId() {
      return "link_" + new Date().getTime() + "_" + this.links.length;
    },

    findLink(link, type) {
      let linkObj = false;
      let index = -1;
      switch (type) {
        case "A":
          index = this.links.findIndex(
            (l) => l.input === link.input && l.alterput === link.alterput
          );
          linkObj = this.links[index];
          break;
        case "O":
          index = this.links.findIndex(
            (l) => l.input === link.input && l.output === link.output
          );
          linkObj = this.links[index];
          break;
      }

      if (!linkObj) {
        linkObj = false;
      }
      return linkObj;
    },

    zoom(event) {
      if (event.wheelDelta > 0 && this.scale < 1) {
        this.scale += 0.1;
      } else if (event.wheelDelta < 0 && this.scale > 0.3) {
        this.scale -= 0.1;
      }
    },

    mouseDown(event) {
      this.panViewStart(event);

      if (event.button == 1 && event.buttons == 4) {
        if (this.midleMouseBtnPress) {
          this.trasnlateToInit();
        }

        this.midleMouseBtnPress = true;
        setTimeout(() => {
          this.midleMouseBtnPress = false;
        }, 300);
      }
    },

    panViewStart(event) {
      if (event.button !== 1 && event.buttons !== 4) {
        return;
      }
      this.onPan = true;
      this.prevPanPos = {
        x: event.x,
        y: event.y,
      };
    },

    mouseMove(event) {
      this.panViewMove(event);
    },

    panViewMove(event) {
      if (!this.onPan) {
        return;
      }

      let updateValueX = this.svg.x + event.x - this.prevPanPos.x;
      let updateValueY = this.svg.y + event.y - this.prevPanPos.y;

      if (updateValueX <= 0) {
        this.svg.x = updateValueX;
        this.prevPanPos.x = event.x;
      }

      if (updateValueY <= 0) {
        this.svg.y = updateValueY;
        this.prevPanPos.y = event.y;
      }
    },

    trasnlateToInit() {
      this.svg.x = 0;
      this.svg.y = 0;
    },
  },

  computed: {
    getSvgPosition() {
      return `translate(${this.svg.x},${this.svg.y})`;
    },
  },
};
</script>

<style scoped>
#main-grid {
  width: 100%;
  height: 100%;
  background-color: brown;
}

#main-container {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
}

.body-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
}

.body-center {
  width: 100%;
}
</style>
