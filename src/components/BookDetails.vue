<template>
  <base-dialog v-if="book != null">
    <template #title>
      {{ book.title }}
      <label class="releseDate">({{ book.releaseDate }})</label>
    </template>
    <template #author> {{ book.author }}</template>
    <template #poster>
      <img :src="book.poster" v-if="book.poster !== null" />
      <img src="../../posters/noimg.jpeg" v-else />
    </template>
    <template #genres>
      <genre-badge v-for="genre in book.genres" :key="genre"> {{ genre }} </genre-badge>
    </template>
    <template #description> {{ book.description }}</template>
    <template #read>
      <div class="navButtons">
        <router-link class="read" v-if="book.file.length < 1" :to="`${this.$route.path}`">Blocked</router-link>
        <router-link class="read" v-else-if="book.savedPage == null"
          :to="`/${this.$route.params.bookId}/read/1`">Read</router-link>
        <router-link v-else class="read"
          :to="`/${this.$route.params.bookId}/read/` + book.savedPage">Continue</router-link>
        <router-link class="otherOptions" :to="`/details/${this.$route.params.bookId}/edit`">Edit</router-link>
        <router-link class="otherOptions" to="/" @click="deleteBook(book.id)">Delete</router-link>
      </div>
    </template>
    <template #chapters>
      <base-chapters v-for="(chapter, index) in book.chapters" :key="chapter">
        <template #num>{{ index + 1 }}</template>
        <router-link class="chapterLink" :to="`/${this.$route.params.bookId}/read/` + chapter.page">
          {{ chapter.name }}
        </router-link>
        <template #page> {{ chapter.page }} </template>
      </base-chapters>
    </template>
  </base-dialog>
</template>

<script>
import BaseDialog from "./layout/BaseDialog.vue";
import BaseChapters from "./layout/BaseChapters.vue";
import GenreBadge from "./layout/GenreBadge.vue";
import { useBooks } from "../stores/useBooks.js";
import { mapState, mapActions } from "pinia";
import BookEdit from "./BookEdit.vue";

export default {
  emits: ["close"],
  components: {
    BaseDialog,
    BaseChapters,
    GenreBadge,
    BookEdit,
  },
  computed: {
    ...mapState(useBooks, ["books"]),
    book() {
      const bookId = this.$route.params.bookId;
      return this.books.find((book) => book.id === parseInt(bookId));
    },
    readLink() {
      const bookId = this.$route.params.bookId;
      return "/details/" + bookId + "/read";
    },
  },
  methods: {
    ...mapActions(useBooks, ["deleteBook"]),
  },
};
</script>

<style scoped>
img {
  max-width: 17vw;
  float: left;
  border-radius: 10px;
}

.releseDate {
  font-size: 18px;
}

.navButtons {
  display: flex;
  flex-direction: row;
  column-gap: 5px;
}

.read {
  background-color: #4ecca3;
  text-decoration: none;
  font-size: 25px;
  padding: 10px;
  text-align: center;
  border: none;
}

.otherOptions {
  background-color: #393e46;
  text-decoration: none;
  font-size: 25px;
  padding: 10px;
  text-align: center;
  border: none;
}

a.read {
  color: #232931;
}

a {
  text-decoration: none;
  color: #eeeeee;
}

a:hover {
  opacity: 0.7;
}

@media (max-width: 766px) {
  .navButtons {
    flex-direction: column;
    row-gap: 10px;
  }

  img {
    max-width: 75vw;
  }
}
</style>
