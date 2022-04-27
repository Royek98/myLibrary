<template>
  <div id="mainMenu">
    <the-logo></the-logo>
    <search-bar></search-bar>
    <genres-selector></genres-selector>
    <sort-by></sort-by>
    <div id="add">
      <router-link to="/add"
        >Book <i class="fa fa-plus-circle" aria-hidden="true"></i
      ></router-link>
    </div>
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
#mainMenu {
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

#add {
    margin-top: 5vh;
}
</style>