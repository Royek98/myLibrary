<template>
  <form @submit.prevent="saveBook">
    <base-dialog show="true">
      <template #title
        >Title:
        <input
          type="text"
          v-model.trim="book.title"
          class="titleAndAuthor"
          :class="{ invalid: invalidTitle() }"
          @change="checkEditing"
        />
        <span style="white-space: nowrap"
          >(<input
            type="date"
            v-model.trim="book.releaseDate"
            class="titleAndAuthor"
            @change="checkEditing"
            :class="{ invalid: invalidDate() }"
          />)</span
        >
        Pages:
        <input
          type="number"
          v-model.number="book.maxPages"
          class="pagesInput"
          @change="checkEditing"
          :class="{ invalid: invalidMaxPages() }"
        />
      </template>
      <template #author
        >Author:
        <input
          type="text"
          v-model.trim="book.author"
          class="titleAndAuthor"
          @change="checkEditing"
          :class="{ invalid: invalidAuthor() }"
        />
        <span v-if="book.file.length <= 0"
          >File: <input type="file" v-on:change="onFileChange"
        /></span>
        <span v-else
          >File: <span style="font-size: 15px">{{ book.file }}</span>
          <button
            @change="checkEditing"
            @click="removeFile()"
            class="buttonWithBg"
          >
            <i class="fa fa-minus-circle" aria-hidden="true"></i></button
        ></span>
      </template>
      <template #poster>
        <div v-if="book.poster !== null">
          <img :src="book.poster" />
          <button
            @change="checkEditing"
            @click="book.poster = null"
            class="buttonWithBg"
          >
            <i class="fa fa-minus-circle" aria-hidden="true"></i>
          </button>
        </div>
        <div v-else>
          <input
            id="posterFile"
            type="file"
            @change="onPosterChange"
          />
        </div>
      </template>
      <template #genres>
        <genre-badge v-for="genre in book.genres" :key="genre"
          >{{ genre
          }}<button
            @click="
              removeGenre(genre);
              checkEditing();
            "
            class="removeBookBttn"
          >
            <i class="fa fa-minus-circle" aria-hidden="true"></i>
          </button>
        </genre-badge>
        <span v-if="genreAlert" id="genreAlert">Already a genre</span>
        <button
          @click="showGenres = true"
          v-if="!showGenres"
          class="buttonWithBg genreBttn"
          :class="{ invalidGenre: invalidGenre() }"
        >
          Genre<i class="fa fa-plus-circle" aria-hidden="true"></i>
        </button>
        <select v-if="showGenres">
          <option @click="showGenres = false">Cancel</option>
          <option
            v-for="gen in getGenres"
            :key="gen"
            @click="
              addGenre(gen);
              showGenres = false;
              checkEditing();
            "
          >
            {{ gen }}
          </option>
        </select>
      </template>
      <template #description>
        Description:
        <textarea
          v-model.trim="book.description"
          @change="checkEditing"
          :class="{ invalid: invalidDesc() }"
        ></textarea>
      </template>
      <template #read>
        <button class="read" @click="save" :class="{ unsaved: editing }">
          Save
        </button>
        <router-link
          class="otherOptions"
          :to="linkBack"
          @click="editing = false"
          >Cancel</router-link
        >
      </template>
      <template #chapters>
        <base-chapters v-for="(chapter, index) in book.chapters" :key="chapter">
          <template #num>{{ index + 1 }}</template>
          <input
            type="text"
            v-model.trim="chapter.name"
            class="chapterName"
            @change="checkEditing"
            :class="{ invalid: invalidNameChapter(index) }"
          />
          <template #page>
            <input
              type="number"
              min="1"
              v-model.number="chapter.page"
              class="chapterNumber"
              @change="checkEditing"
              :class="{ invalid: invalidNumber(index) }"
            />
            <button
              @click="
                removeChapter(chapter, index);
                checkEditing();
              "
              class="buttonWithBg"
            >
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </button>
          </template>
        </base-chapters>
        <div id="addBookBttn">
          <button
            @click="
              addChapter();
              checkEditing();
            "
            class="buttonWithBg"
          >
            Chapter<i class="fa fa-plus-circle" aria-hidden="true"></i>
          </button>
        </div>
      </template>
    </base-dialog>
  </form>
</template>

<script>
import BaseDialog from "./layout/BaseDialog.vue";
import { useBooks } from "../stores/useBooks.js";
import { mapState, mapActions, mapWritableState } from "pinia";
import GenreBadge from "./layout/GenreBadge.vue";
import BaseChapters from "./layout/BaseChapters.vue";
import _ from 'lodash';
export default {
  data() {
    return {
      book: {
        id: null,
        title: "",
        author: "",
        description: "",
        poster: null,
        file: "",
        genres: [],
        maxPages: null,
        releaseDate: null,
        chapters: [
          // {
          //   name: "",
          //   page: null,
          // },
        ],
      },
      showGenres: false,
      bookFromDb: null,
      genreAlert: false,
      formIsValid: true,
      formIsValidTitle: true,
      formIsValidAuthor: true,
      formIsValidDate: true,
      formIsValidDesc: true,
      formIsValidGenres: true,
      formIsValidChapterName: [],
      formIsValidChapterPage: [],
      formIsValidMaxPages: true,
    };
  },
  methods: {
    checkEditing() {
      this.editing = true;
    },
    invalidTitle() {
      if (this.book.title.length === 0) {
        this.formIsValidTitle = false;
        return true;
      }
      this.formIsValidTitle = true;
      return false;
    },
    invalidAuthor() {
      if (this.book.author.length === 0) {
        this.formIsValidAuthor = false;
        return true;
      }
      this.formIsValidAuthor = true;
      return false;
    },
    invalidDesc() {
      if (this.book.description.length === 0) {
        this.formIsValidDesc = false;
        return true;
      }
      this.formIsValidDesc = true;
      return false;
    },
    invalidMaxPages() {
      if (this.book.maxPages <= 0) {
        this.formIsValidMaxPages = false;
        return true;
      }
      this.formIsValidMaxPages = true;
      return false;
    },
    invalidDate() {
      if (this.book.releaseDate === null) {
        this.formIsValidDate = false;
        return true;
      }
      this.formIsValidDate = true;
      return false;
    },
    invalidNumber(inx) {
      const chapter = this.book.chapters.find((chapter, index) => index == inx);

      if (chapter.page < 1 || chapter.page > this.book.maxPages) {
        this.formIsValidChapterPage[inx] = false;
        return true;
      }
      this.formIsValidChapterPage[inx] = true;
      return false;
    },
    invalidNameChapter(inx) {
      const chapter = this.book.chapters.find(
        (chapter, index) => index === inx
      );
      if (chapter.name.length === 0) {
        this.formIsValidChapterName[inx] = false;
        return true;
      }
      this.formIsValidChapterName[inx] = true;
      return false;
    },
    invalidGenre() {
      if (this.book.genres.length < 1) {
        this.formIsValidGenres = false;
        return true;
      }
      this.formIsValidGenres = true;
      return false;
    },
    removeGenre(genre) {
      return (this.book.genres = this.book.genres.filter(
        (genres) => genres !== genre
      ));
    },
    addGenre(genre) {
      if (!this.book.genres.some((genres) => genres === genre)) {
        this.book.genres.push(genre);
      } else {
        this.genreAlert = true;

        setTimeout(() => (this.genreAlert = false), 2000);
      }
    },
    removeChapter(chapter, index) {
      this.formIsValidChapterName.splice(index, 1);
      this.formIsValidChapterPage.splice(index, 1);
      return (this.book.chapters = this.book.chapters.filter(
        (chapters) => chapters !== chapter
      ));
    },
    addChapter() {
      const chapter = {
        name: "",
        page: null,
      };
      this.formIsValidChapterName.push(true);
      this.formIsValidChapterPage.push(true);
      this.book.chapters.push(chapter);
    },
    save() {
      if (
        !this.formIsValidTitle ||
        !this.formIsValidAuthor ||
        !this.formIsValidDate ||
        !this.formIsValidDesc ||
        !this.formIsValidGenres ||
        !this.formIsValidMaxPages ||
        !this.invalidChapters ||
        !this.invalidPages
      )
        return;
      this.editing = false;
      this.formIsValid = true;
      if (this.$route.params.bookId !== undefined) {
        this.editBook(this.book);
      } else {
        this.book.id = this.books.length + 1;
        this.addBook(this.book);
      }
      this.$router.push("/details/" + this.book.id);
    },
    onPosterChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.book.poster = "../../posters/" + files[0].name;
      this.checkEditing();
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.book.file = "../../books/" + files[0].name;
      this.checkEditing();
    },
    removeFile() {
      this.book.file = "";
    },
    ...mapActions(useBooks, ["editBook"]),
    ...mapActions(useBooks, ["addBook"]),
  },
  emits: ["close"],
  components: {
    BaseDialog,
    GenreBadge,
    BaseChapters,
  },
  computed: {
    ...mapState(useBooks, ["books"]),
    ...mapState(useBooks, ["getGenres"]),
    ...mapWritableState(useBooks, ["editing"]),
    linkBack() {
      const id = this.$route.params.bookId;
      if (id !== undefined) {
        return "/details/" + id;
      } else {
        return "/";
      }
    },
    invalidChapters() {
      if (this.formIsValidChapterName.some((ch) => ch === false)) return false;
      return true;
    },
    invalidPages() {
      if (this.formIsValidChapterPage.some((ch) => ch === false)) return false;
      return true;
    },
    // book() {

    //   return book;
    // },
  },
  created() {
    const bookId = this.$route.params.bookId;
    if (bookId != null) {
      const b = this.books.find((book) => book.id === parseInt(bookId));
      this.book = _.cloneDeep(b);
      for (var i = 0; i < this.book.chapters.length; i++) {
        this.formIsValidChapterName.push(true);
        this.formIsValidChapterPage.push(true);
      }
    }
  },
};
</script>

<style scoped>
span {
  color: white;
}

img {
  max-width: 17vw;
  float: left;
  border-radius: 10px;
}

.releseDate {
  font-size: 18px;
}

.read {
  background-color: #4ecca3;
  text-decoration: none;
  font-size: 25px;
  padding: 10px;
  text-align: center;
  max-width: 100px;
  margin-bottom: -2vh;
  border: none;
  display: block;
  float: left;
}

.otherOptions {
  background-color: #393e46;
  text-decoration: none;
  font-size: 25px;
  padding: 10px;
  text-align: center;
  max-width: 100px;
  /* margin-bottom: -2vh; */
  margin-left: 5px;
  border: none;
  display: block;
  float: left;
  color: #eeeeee;
}

.read:hover {
  cursor: pointer;
}
.otherOptions:hover {
  cursor: pointer;
}

button:hover,
a:hover {
  opacity: 0.7;
}

input[type="file"]#posterFile::file-selector-button {
  width: 17vw;
  height: 55vh;
  display: block;
}

.buttonWithBg {
  border: none;
  background-color: #232931;
  color: #4ecca3;
  font-size: 25px;
}

.genreBttn {
  padding: 10px;
}

.buttonWithBg:hover {
  cursor: pointer;
}

#addBookBttn {
  width: 100%;
  text-align: center;
}

.removeBookBttn {
  border: none;
  background-color: #4ecca3;
  color: #232931;
  font-size: 20px;
}

.removeBookBttn:hover {
  cursor: pointer;
}
input[type="text"].titleAndAuthor {
  border: 1px solid #eeeeee;
  background-color: #393e46;
  padding: 10px;
  color: #eeeeee;
  border-radius: 10px;
}
input[type="text"].chapterName {
  border: 1px solid #eeeeee;
  background-color: #393e46;
  padding: 10px;
  color: #eeeeee;
  border-radius: 10px;
  width: 20vw;
}
input[type="number"].chapterNumber {
  border: 1px solid #eeeeee;
  background-color: #393e46;
  padding: 10px;
  color: #eeeeee;
  border-radius: 10px;
  width: 6vw;
}
input[type="number"].pagesInput {
  border: 1px solid #eeeeee;
  background-color: #393e46;
  padding: 10px;
  color: #eeeeee;
  border-radius: 10px;
}

textarea {
  width: 100%;
  height: 200px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  background-color: #393e46;
  font-size: 16px;
  color: #eeeeee;
  resize: none;
}
textarea:focus {
  outline: none !important;
  border: 2px solid #4ecca3;
}
input[type="number"]:focus {
  outline: none !important;
  border: 2px solid #4ecca3;
}
input[type="text"]:focus {
  outline: none !important;
  border: 2px solid #4ecca3;
}

#genreAlert {
  float: left;
  padding: 9px;
  border: 1px solid #393e46;
  background-color: #cc4e4e;
  color: #eeeeee;
  margin-left: 8px;
  margin-top: 8px;
  border-radius: 10px;
}

.invalid {
  border: 2px solid red !important;
}

.invalidGenre {
  color: red !important;
}

.unsaved {
  animation-name: example;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}

@keyframes example {
  from {
    background-color: red;
  }
  to {
    background-color: yellow;
  }
}
</style>