<template>
  <div id="main-container">
    <div class="diagram-menu">
      <b-nav class="p-1">
        <b-list-group>
          <b-list-group-item
            class="sidebar-item"
            @click="trasnlateToInit"
            v-b-tooltip.hover.right="
              'Move diagram grid to init position (x = 0, y = 0)'
            "
            >Initial Position</b-list-group-item
          >
          <b-list-group-item
            class="sidebar-item"
            @click="Clear"
            v-b-tooltip.hover.right="'Clear diagram grid'"
            >Clear</b-list-group-item
          >
          <b-list-group-item
            class="sidebar-item-drag"
            draggable="true"
            @dragend="dropNew($event, 0)"
            v-b-tooltip.hover.right="
              'Drop a action with input and output ports on diagram grid'
            "
            >Two Ways</b-list-group-item
          >
          <b-list-group-item
            class="sidebar-item-drag"
            draggable="true"
            @dragend="dropNew($event, 1)"
            v-b-tooltip.hover.right="
              'Drop a action with input, output and alterput ports on diagram grid'
            "
            >Three Ways</b-list-group-item
          >
          <b-list-group-item
            class="sidebar-item-drag"
            draggable="true"
            @dragend="dropNew($event, 2)"
            v-b-tooltip.hover.right="
              'Drop a action with oly a input port on diagram grid'
            "
            >Single Way In</b-list-group-item
          >
          <b-list-group-item
            class="sidebar-item-drag"
            draggable="true"
            @dragend="dropNew($event, 3)"
            v-b-tooltip.hover.right="
              'Drop a action with oly a output port on diagram grid'
            "
            >Single Way Out</b-list-group-item
          >
        </b-list-group>
      </b-nav>
    </div>
    <div class="body-container">
      <div class="body-center">
        <slot></slot>
        <svg
          id="main-grid"
          @mousedown="mouseDown($event)"
          @mousemove="mouseMove($event)"
          @mouseup="unselect"
          @mousewheel.prevent="zoom"
        >
          <defs>
            <pattern
              id="smallGrid"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 8 0 L 0 0 0 8"
                fill="none"
                stroke="gray"
                stroke-width="0.5"
              />
            </pattern>
            <pattern
              id="grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <rect width="80" height="80" fill="url(#smallGrid)" />
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="gray"
                stroke-width="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <DiagramCard
            v-for="action in diagram.actions"
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
            @clone="cloneAction"
            @unselect="unselect"
            @click-port="setSelectedPort"
            @set-root="setRootAction"
            @edit-description="editActionDescription"
            @show-tooltip="showTooltip(action, $event)"
            @hide-tooltip="hideTooltip"
            @edit-title="editCardTitle"
          />
          <DiagramTooltip
            v-for="tooltip in tooltips"
            :key="tooltip.message"
            :message="tooltip.message"
            :action="tooltip.action"
            :cardWidth="cardWidth"
            :cardHeight="cardHeight"
            :scale="scale"
            :origin="svg"
          />
          <FormEditTitle
            v-if="cardToEditTitle"
            :card="cardToEditTitle"
            :scale="scale"
            :origin="svg"
            @cancel="onCloseTitleEdition()"
            @changed="onSavedTitleCard()"
          />
          <LinkLine
            v-for="link in diagram.links"
            :key="link.id"
            :value="link"
            :scale="scale"
            :origin="svg"
            @select-line="setSelectedLine($event)"
          />
          <PanZoomPanel
            :zoom="scale"
            @zoomChange="updateZoom($event)"
            :config="zoomCfg"
          />
        </svg>
      </div>
      <LigaturesMap
        :values="diagram.links"
        @drop-item="dropLink($event)"
        @in-ligature="inLigature($event)"
        @out-ligature="outLigature($event)"
      />
    </div>
  </div>
</template>

<script>
import DiagramCard from "./DiagramCard";
import DiagramTooltip from "./DiagramTooltip";
import LinkLine from "./LinkLine";
import LigaturesMap from "./LigaturesMap";
import FormEditTitle from "./FormEditTitle";
import PanZoomPanel from './PanZoomPanel';
import lodash from "lodash";
import Vue from "vue";

export default {
  name: "Diagram",

  props: ["diagram", "zoomCfg"],

  components: {
    DiagramCard,
    DiagramTooltip,
    LinkLine,
    LigaturesMap,
    FormEditTitle,
    PanZoomPanel
  },

  model: {
    prop: "diagram",
    event: "change",
  },

  data() {
    return {
      cardWidth: 250,
      cardHeight: 150,
      movingAction: null,
      initialMovingActionPosition: null,
      stage: [],
      scale: 1,
      prevPanPos: null,
      svg: {
        x: 0,
        y: 0,
      },
      selectedLine: null,
      midleMouseBtnPress: false,
      cardToEditTitle: null,
      tooltipMap: {},
    };
  },

  methods: {
    Clear() {
      this.diagram.actions = [];
      this.diagram.links = [];
    },

    removeAction(action) {
      let index = this.getActionIdByName(action.name);
      this.removeActionLinks(action);
      this.diagram.actions.splice(index, 1);
    },

    removeActionLinks(action) {
      let dropLinks = [];
      this.diagram.links.forEach((link) => {
        if (link.input && link.input.ref.name == action.name) {
          dropLinks.push(link.id);
        }
        if (link.output && link.output.ref.name == action.name) {
          dropLinks.push(link.id);
        }
        if (link.alterput && link.alterput.ref.name == action.name) {
          dropLinks.push(link.id);
        }
      });

      dropLinks.forEach((linkId) => this.dropLink(linkId));
    },

    editActionDescription(action) {
      console.log(action);
    },

    cloneAction(action) {
      let newAction = lodash.cloneDeep(action);
      newAction.name = newAction.name + "-copy";
      if (newAction.input) {
        newAction.input = {};
      }
      if (newAction.output) {
        newAction.output = {};
      }
      if (newAction.alterput) {
        newAction.alterput = {};
      }

      newAction.x = newAction.x + 50;
      newAction.y = newAction.y + 50;
      this.diagram.actions.push(newAction);
    },

    getActionIdByName(name) {
      return this.diagram.actions.findIndex((act) => act.name == name);
    },

    inLigature(event) {
      this.changeColorLinkLine(event, "black", "yellow");
    },

    outLigature(event) {
      this.changeColorLinkLine(event, "yellow", "black");
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
        newAct.isRoot = this.checkRootAction();
        newAct.output = {};
        newAct.input = false;
        newAct.alterput = false;
      }

      newAct.x = newAct.x > 0 ? newAct.x : 0;
      newAct.y = newAct.y > 0 ? newAct.y : 0;

      this.diagram.actions.push(newAct);
    },

    checkRootAction() {
      let rootExist = false;
      this.diagram.actions.forEach((act) => {
        if (act.isRoot) {
          rootExist = true;
        }
      });
      return !rootExist;
    },

    setSelectedLine(event) {
      this.selectedLine = event;
    },

    dropLink(event) {
      const index = this.diagram.links.findIndex((l) => l.id == event);
      this.diagram.links.splice(index, 1);
      this.stage = [];
    },

    findAvaliableName() {
      let exists = 1;
      let count = 0;
      let name = "";
      while (exists >= 0) {
        name = "new-action-" + count;
        exists = this.diagram.actions.findIndex((act) => act.name === name);
        count++;
      }
      return name;
    },

    select(event) {
      if (event.button !== 0) {
        return;
      }
      this.movingAction = event.action;
      this.movingAction.select = true;
      this.movingActionInitialPos = {
        x: this.movingAction.x,
        y: this.movingAction.y,
      };
      this.movingActionClientPos = {
        x: event.clientX,
        y: event.clientY,
      };
    },

    unselect() {
      if (this.movingAction && this.movingAction.select) {
        this.movingAction.select = false;
      }

      this.movingAction = null;
      this.onPan = false;
    },

    move(event) {
      if (this.movingAction == null) {
        return;
      }
      this.moveAction(event);
    },

    moveAction(event) {
      const speed = 1 / this.scale;
      const {
        x: initialClientX,
        y: initialClientY,
      } = this.movingActionClientPos;
      const { x: initialX, y: initialY } = this.movingActionInitialPos;
      let valueX = (event.clientX - initialClientX) * speed;
      let valueY = (event.clientY - initialClientY) * speed;
      if (initialX + valueX <= 0) {
        this.movingAction.x = 0;
      } else {
        this.movingAction.x = initialX + valueX;
      }
      if (initialY + valueY <= 0) {
        this.movingAction.y = 0;
      } else {
        this.movingAction.y = initialY + valueY;
      }
    },

    setSelectedPort(event, type) {
      if (this.alreadyOnStage(event.name)) {
        this.stage = [];
      }
      this.stage[type] = event;
      this.buildLink(this.stage);
    },

    alreadyOnStage(actName) {
      if (
        this.stage.forEach((stg) => {
          stg.ref.name === actName;
          return true;
        })
      )
        return false;
    },

    setRootAction(action) {
      this.diagram.actions.forEach((act) => {
        act.isRoot = false;
      });
      action.isRoot = true;
    },

    buildLink(param) {
      if (param) {
        if (
          (param &&
            param.input &&
            param.output &&
            param.input.ref.name === param.output.ref.name) ||
          (param &&
            param.input &&
            param.alterput &&
            param.input.ref.name === param.alterput.ref.name)
        ) {
          this.stage = [];
          return;
        }

        if (param.input && param.output && !this.findLink(param, "O")) {
          const link = {
            id: this.getLinkId(),
            input: param.input,
            output: param.output,
          };

          this.diagram.links.push(link);
          this.stage = [];
        } else if (
          param.input &&
          param.alterput &&
          !this.findLink(param, "A")
        ) {
          const link = {
            id: this.getLinkId(),
            input: param.input,
            alterput: param.alterput,
          };

          this.diagram.links.push(link);
          this.stage = [];
        }
      }
    },

    getLinkId() {
      return "link_" + new Date().getTime() + "_" + this.diagram.links.length;
    },

    findLink(link, type) {
      let linkObj = false;
      let index = -1;
      switch (type) {
        case "A":
          index = this.diagram.links.findIndex(
            (l) => l.input === link.input && l.alterput === link.alterput
          );
          linkObj = this.diagram.links[index];
          break;
        case "O":
          index = this.diagram.links.findIndex(
            (l) => l.input === link.input && l.output === link.output
          );
          linkObj = this.diagram.links[index];
          break;
      }

      if (!linkObj) {
        linkObj = false;
      }
      return linkObj;
    },

    zoom(event) {
      if (event.wheelDelta > 0.4 && this.scale < 1) {
        this.scale += 0.1;
      } else if (event.wheelDelta < 0 && this.scale > 0.4) {
        this.scale -= 0.1;
      }
    },

    mouseDown(event) {
      this.panViewStart(event);

      if (event.button == 1 && event.buttons == 4) {
        this.tryMoveToInitialPanPosition();
      }
    },

    tryMoveToInitialPanPosition() {
      if (this.midleMouseBtnPress) {
        this.trasnlateToInit();
      }

      this.midleMouseBtnPress = true;
      setTimeout(() => {
        this.midleMouseBtnPress = false;
      }, 300);
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

    onCloseTitleEdition() {
      this.cardToEditTitle = null;
    },

    onSavedTitleCard() {
      this.cardToEditTitle = null;
    },

    editCardTitle(card) {
      this.cardToEditTitle = card;
    },
    showTooltip(action, message) {
      const tooltipData = {
        message,
        action,
      };
      Vue.set(this.tooltipMap, message, tooltipData);
    },

    hideTooltip(message) {
      Vue.set(this.tooltipMap, message, undefined);
    },

    updateZoom(operation) {
      let event = {};
      if (operation === 'plus') {
        event = { wheelDelta: 0.5 }
      } else {
        event = { wheelDelta: -1 }
      }
      
      this.zoom(event)
    }
  },

  computed: {
    getSvgPosition() {
      return `translate(${this.svg.x},${this.svg.y})`;
    },
    tooltips() {
      return Object.values(this.tooltipMap).filter((value) => !!value);
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
  height: 100%;
  display: flex;
  flex-flow: column;
}

.sidebar-item:hover {
  cursor: pointer;
}

.sidebar-item-drag:hover {
  cursor: grab;
}
</style>
