<template>
  <div id="homeMenu">
    <the-logo></the-logo> <br />
    <search-bar></search-bar>
    <genres-selector></genres-selector>
    <sort-by></sort-by>
    <router-link class="add" to="/add">Book <i class="fa fa-plus-circle" aria-hidden="true"></i></router-link>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import TheLogo from "./TheLogo.vue";
import SearchBar from "./SearchBar.vue";
import GenresSelector from "./GenresSelector.vue";
import SortBy from "./SortBy.vue";
export default {
  components: {
    TheLogo,
    SearchBar,
    GenresSelector,
    SortBy,
  },
};
</script>

<style scoped>
#homeMenu {
  color: #d6d8db;
}

a {
  text-decoration: none;
  color: #eee;
  background-color: #232931;
  padding: 15px;
  border-radius: 10px;
  font-size: 20px;
}

a:hover {
  background-color: #4ecca3;
  color: #393e46;
}

.add {
  display: block;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
</style>