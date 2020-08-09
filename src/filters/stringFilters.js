import Vue from "vue";

Vue.filter("upperCase", function(value) {
  return value.toUpperCase();
});

Vue.filter("limitSize", function(value) {
  return value.substr(0, 10);
});
