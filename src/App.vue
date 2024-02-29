<template>
  <div>
    <navigation-component></navigation-component>
    <article>
      <content-component></content-component>
    </article>
  </div>
</template>
  
  
<script>
import ContentComponent from "./components/layout/Content.vue";
import NavigationComponent from "./components/layout/NavigationComponent.vue";

export default {
  components: {
    NavigationComponent,
    ContentComponent,
  }
};
</script>
  
<style scoped>
@media (max-width: 766px) {
  article {
    width: 100vw !important;
    padding-top: 10px;
  }
}

article {
  float: left;
  width: 78vw;
}
</style>