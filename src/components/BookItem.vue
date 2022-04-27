<template>
  <router-link :to="linkTo" v-if="!show" @click="show != show">
    <div>
      <div class="wrapper">
        <label :for="poster">{{ title }}</label>
      </div>
      <img :src="poster" v-if="poster !== null" />
      <img src="../../posters/noimg.jpeg" v-else />
    </div>
  </router-link>
  <router-link to="/" @click="show != show" v-else>
    <img :src="poster" />
  </router-link>

  <book-details
    :show="show"
    @close="show = false"
    v-if="editOrDetails == 1"
  ></book-details>
  <book-edit
    :show="show"
    @close="show = false"
    v-else-if="editOrDetails == 2"
  ></book-edit>
</template>

<script>
import BookDetails from "./BookDetails.vue";
import BookEdit from "./BookEdit.vue";
export default {
  props: ["id", "poster", "title"],
  components: {
    BookDetails,
    BookEdit,
  },
  data() {
    return {
      show: false,
    };
  },
  watch: {
    $route() {
      this.checkModal();
    },
  },
  methods: {
    checkModal() {
      if (this.$route.params.bookId) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
  },
  computed: {
    linkTo() {
      return "/details/" + this.id;
    },
    editOrDetails() {
      const name = this.$route.name;
      if (name !== undefined) {
        if (name == "details") return 1;
        else if (name == "edit" || name == "add") return 2;
      }
      return 0;
    },
  },
  created() {
    this.checkModal();
  },
};
</script>

<style scoped>
div {
  float: left;
  width: 180px;
  text-align: center;
}
img {
  width: 150px;
  height: 230px;
  padding: 10px;
  border-radius: 15px;
  float: left;
  margin-left: 4px;
}

div:hover {
  /* border-bottom: 1px solid #4ecca3; */
  background-color: #393e46;
  opacity: 0.8;
  border-radius: 15px;
}

.wrapper {
  color: #eeee;
  white-space: nowrap;
  width: 175px;
  margin-left: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

label:hover {
  cursor: pointer;
}
</style>
