import Vue from "vue";

Vue.filter("upperCase", function(value) {
  return value.toUpperCase();
});
