<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <ul>
        <li class="nav-item">
          <router-link to="/"><a class="nav-item-link">Home</a></router-link>
        </li>
        <li class="nav-item">
          <router-link to="/diagram"><a class="nav-item-link">Diagrama</a></router-link>
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
  font-size: 18px;
}

ul li a:hover {
  text-decoration: none;
}

ul li.nav-item {
  background-color: rgb(101, 137, 204);
  border: 1px solid rgb(80, 115, 180);
  box-shadow: 2px 2px;
  border-radius: 10px;
  padding: 5px;
}

ul li a.nav-item-link {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
