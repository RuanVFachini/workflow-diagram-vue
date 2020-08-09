<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <ul>
        <li>
          <router-link to="/"><a>Home</a></router-link>
        </li>
        <li>
          <router-link to="/diagram"><a>Diagrama</a></router-link>
        </li>
      </ul>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
ul {
  margin: 0px;
  padding: 0px;
  list-style: none;
  display: flex;
}

ul li {
  margin-right: 10px;
}

ul li a {
  color: bisque;
  font-size: 22px;
}

ul li a:hover {
  text-decoration: none;
}
</style>
