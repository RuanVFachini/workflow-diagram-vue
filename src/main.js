import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import "./filters/stringFilters";
import "./assets/style.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

function addListeners(el, message, position, vnode) {
  const mouseOverListener = () => {
    console.log("emiting show-tooltip", { message, position });
    vnode.context.$emit("show-tooltip", { message, position });
  };
  const mouseLeaveListener = () => {
    console.log("emiting hide-tooltip", { message });
    vnode.context.$emit("hide-tooltip", { message });
  };
  el.addEventListener("mouseover", mouseOverListener);
  el.addEventListener("mouseleave", mouseLeaveListener);
  el.__d_tooltip_mouseOverListener = mouseOverListener;
  el.__d_tooltip_mouseLeaveListener = mouseLeaveListener;
}
function removeListeners(el) {
  const mouseOverListener = el.__d_tooltip_mouseOverListener;
  const mouseLeaveListener = el.__d_tooltip_mouseLeaveListener;
  if (mouseOverListener) {
    el.removeEventListener("mouseover", mouseOverListener);
  }
  if (mouseLeaveListener) {
    el.removeEventListener("mouseleave", mouseLeaveListener);
  }
}

Vue.directive("d-tooltip", {
  bind(el, bindings, vnode) {
    console.log(el);
    const message = bindings.value;
    const position = bindings.arg;
    addListeners(el, message, position, vnode);
  },
  update(el, bindings, vnode) {
    const message = bindings.value;
    const position = bindings.arg;
    removeListeners(el);
    addListeners(el, message, position, vnode);
  },
  unbind(el) {
    removeListeners(el);
  },
  methods: {},
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
