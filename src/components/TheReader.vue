<template>
  <div>
    <vue-pdf-embed :source="source1" :page="page1" />
    <br /><br />
    <div class="readerMenu">
      <button class="option" @click="goBack">
        <span class="fa fa-home"></span>
      </button>
      <button class="option" @click="previousPage">
        <span class="fa fa-arrow-left"></span>
      </button>
      {{ page1 }} / {{ book.maxPages }}
      <button class="option" @click="nextPage">
        <span class="fa fa-arrow-right"></span>
      </button>
      <button
        class="option"
        @click="
          savePage(book.id, page1);
          setShow();
        "
      >
        <span class="fa fa-bookmark"></span>
      </button>
      <!-- :class="{ alert: !show }" -->
      <span v-if="show">Page saved!</span>
    </div>
  </div>
</template>

<script>
import VuePdfEmbed from "vue-pdf-embed";
import { useBooks } from "../stores/useBooks.js";
import { mapState, mapActions } from "pinia";

export default {
  components: {
    VuePdfEmbed,
  },
  data() {
    return {
      source1: "",
      page1: null,
      maxPages: null,
      show: false,
    };
  },
  computed: {
    ...mapState(useBooks, ["books"]),
    book() {
      const bookId = this.$route.params.bookId;
      const book = this.books.find((book) => book.id === parseInt(bookId));
      this.maxPages = book.maxPages;
      return book;
    },
  },
  methods: {
    setShow() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 1500);
    },
    previousPage() {
      const bookId = this.$route.params.bookId;
      if (this.page1 == 1) {
        return;
      }

      const page = this.page1 - 1;
      this.$router.push("/" + bookId + "/read/" + page);
    },
    nextPage() {
      if (this.page1 == this.book.maxPages) {
        return;
      }
      const bookId = this.$route.params.bookId;
      const page = this.page1 + 1;
      this.$router.push("/" + bookId + "/read/" + page);
    },
    goBack() {
      this.$router.push("/details/" + this.$route.params.bookId);
    },
    ...mapActions(useBooks, ["savePage"]),
  },
  created() {
    this.source1 = this.book.file;
    this.page1 = parseInt(this.$route.params.pageNumber);
    const bookId = this.$route.params.bookId;
    if (this.page1 > this.maxPages) {
      this.$router.replace("/" + bookId + "/read/" + this.maxPages);
    }
    if (this.page1 < 1) {
      this.$router.replace("/" + this.$route.params.bookId + "/read/1");
    }
  },
  updated() {
    this.page1 = parseInt(this.$route.params.pageNumber);
  },
};
</script>

<style scoped>
@media screen and (min-width: 767px) {
  div {
    background-color: #232931;
    margin-left: -3.5%;
  }

  .readerMenu {
    position: fixed;
    bottom: 0;
    background-color: #393e46;
    width: 62.5%;
    margin-left: -20px;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
  }

  .option {
    background-color: rgb(1, 1, 26, 1);
    border: none;
    color: white;
    width: 4vw;
    height: inherit;
    text-decoration: none;
    font-size: 1.5em;
    cursor: pointer;
    /* display: inline-block; */
  }


  /* 
  .option {
    background-color: rgb(1, 1, 26, 1);
    border: none;
    color: white;
    width: 4vw;
    height: inherit;
    text-decoration: none;
    font-size: 1.5vw;
    display: inline-block;
    cursor: pointer;
  }

  .option1:hover {
    background-color: #4ecca3;
  }

  .option:hover {
    background-color: #4ecca3;
  } */
}

@media (max-width: 766px) {
  .readerMenu {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .option {
    font-size: 1.5em;
  }
  
  .option {
    background-color: rgb(1, 1, 26, 1);
    border: none;
    color: white;
    height: inherit;
    text-decoration: none;
    font-size: 2.5em;
    cursor: pointer;
    display: block;
    /* display: inline-block; */
  }
}
</style>