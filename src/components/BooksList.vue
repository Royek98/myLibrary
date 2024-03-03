<template>
  <section>
      <div>
        <book-item
          v-for="book in getBooks"
          :key="book.id"
          :id="book.id"
          :poster="book.poster"
          :title="book.title"
        ></book-item>
      </div>
  </section>
</template>

<script>
import BookItem from "./BookItem.vue";
import { useBooks } from "../stores/useBooks.js";
import { mapState } from "pinia";

export default {
  computed: {
    ...mapState(useBooks, ["getBooks"]),
  },
  components: {
    BookItem,
  },
};
</script>

<style scoped>
@media (max-width: 766px) {
  div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-bottom: 15vh;
  }
}
</style>
