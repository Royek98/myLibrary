<template>
  <div id="content">
    <router-view></router-view>
  </div>
</template>

<script>
import BooksList from "../BooksList.vue";

export default {
  components: {
    BooksList,
  },
};
</script>

<style scoped>
div {
    overflow-y: scroll;
    /* height: 95vh; */
    height: 99vh;
    width: 90%;
    padding-left: 7.5%;
    scrollbar-color: #4ECCA3 #393E46;
    scrollbar-width: thin;
}

@media (max-width: 766px) {
  div {
    width: 100vw !important;
    padding-left: 0%;
  }
}

</style>