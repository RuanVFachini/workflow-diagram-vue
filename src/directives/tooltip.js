import Vue from "vue";

function addListeners(el, message, vnode) {
  const mouseOverListener = () => {
    vnode.context.$emit("show-tooltip", message);
  };
  const mouseLeaveListener = () => {
    vnode.context.$emit("hide-tooltip", message);
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
  inserted(el, bindings, vnode) {
    const message = bindings.value;
    addListeners(el, message, vnode);
  },
  update(el, bindings, vnode) {
    const message = bindings.value;
    removeListeners(el);
    addListeners(el, message, vnode);
  },
  unbind(el) {
    removeListeners(el);
  },
  methods: {},
});
