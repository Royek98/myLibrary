<template>
  <div>
    <nav id="menu">
      <main-menu v-if="menuPicker"></main-menu>
      <reader-menu v-else></reader-menu>
    </nav>
    <article>
      <!-- <selected-filters></selected-filters> -->
      <content-component></content-component>
    </article>
  </div>
</template>


<script>
import MainMenu from "./components/layout/MainMenu.vue";
import ContentComponent from "./components/layout/Content.vue";
import ReaderMenu from './components/layout/ReaderMenu.vue'
// import SelectedFilters from './components/layout/SelectedFilters.vue'

export default {
  components: {
    MainMenu,
    ContentComponent,
    ReaderMenu,
  },
  computed: {
    menuPicker() {
      if (this.$route.name == 'reader') {
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
nav {
  float: left;
  width: 16vw;
  text-align: center;
  background-color: #393e46;
  height: 100vh;
  margin-top: -2px;
}

article {
  float: left;
  width: 78vw;
}

/* div {
  width: 95%;
} */

@media only screen and (max-width: 1500px) {
  nav {
    overflow-y: scroll;
    scrollbar-color: #4ECCA3 #393E46;
    scrollbar-width: thin;
  }
}

@media only screen and (max-height: 600px) {
  nav {
    overflow-y: scroll;
    scrollbar-color: #4ECCA3 #393E46;
    scrollbar-width: thin;
  }
}

@media only screen and (max-width: 600px) {
  nav {
    width: 25vw;
  }

  article {
    width: 64vw;
  }
}

</style>