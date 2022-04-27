<template>
  <div
    v-for="(ch, index) in book.chapters"
    :key="ch"
    :class="{ current: index == currentChapter }"
  >
    <button @click="goToChapter(ch.page)">
      <span class="chapter">Chapter {{ parseInt(index) + 1 }}</span>
      <span class="page"> {{ ch.page }} </span>
    </button>
  </div>

  <div v-if="book.chapters.length < 1">Empty Chapters</div>
</template>

<script>
import { useBooks } from "../../stores/useBooks.js";
import { mapState } from "pinia";
export default {
  data() {
    return {
      numOfChapters: null,
      //   currentChapter: null
    };
  },
  computed: {
    ...mapState(useBooks, ["books"]),
    book() {
      const bookId = this.$route.params.bookId;
      const book = this.books.find((book) => book.id === parseInt(bookId));
      this.numOfChapters = book.chapters.length;
      return { ...book };
    },
    currentChapter() {
      const pageNumber = this.$route.params.pageNumber;
      for (var i = 1; i < this.numOfChapters; i++) {
        var a = this.book.chapters[i].page;
        var b = this.book.chapters[i - 1].page;
        if (pageNumber < a && pageNumber >= b) return i - 1;
        else if (pageNumber < b) return null;
        else if (i == this.numOfChapters - 1) return i;
      }
    },
  },
  methods: {
    goToChapter(page) {
      const bookId= this.$route.params.bookId;
      this.$router.push('/' + bookId + '/read/' + page);
    },
  },
};
</script>

<style scoped>
div {
  text-align: center;
  background-color: #494d55;
  border-radius: 10px;
  margin-top: 5px;
  color: #eeee;
}
.chapter {
  width: 50%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  display: inline-block;
}
.page {
  width: 50%;
  overflow: hidden;
  display: inline-block;
}
.current {
  color: #232931;
  background-color: #4ecca3;
}

button {
  width: 100%;
  border: none;
  background-color: inherit;
  color: inherit;
  font-size: 17px;
  padding: 10px;
  border-radius: inherit;
}

button:hover {
  cursor: pointer;
}
div:hover {
  opacity: 0.7;
}
</style>