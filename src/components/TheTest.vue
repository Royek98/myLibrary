<template>
  <book-edit :show="show" @close="show = false"></book-edit>
</template>

<script>
import BookEdit from "../components/BookEdit.vue";
export default {
  components: {
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
  created() {
    this.checkModal();
  },
};
</script>