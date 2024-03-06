<template>
  <p class="noselect genreButton" @click="show = !show">Genres:</p>
  <div class="genres" v-if="show">
    <genre-checkbox v-for="genre in genres" :key="genre" :label="genre" @genre-checked="genreChecked"
      :value="selectedGenres.includes(genre)"></genre-checkbox>
  </div>
  <div class="genres" v-else>
    <genre-checkbox v-for="genre in selectedGenres" :key="genre" :label="genre" @genre-checked="genreChecked"
      value="true"></genre-checkbox>
  </div>
</template>

<script>
import { useBooks } from "../../stores/useBooks.js";
import { mapState, mapWritableState } from "pinia";
import GenreCheckbox from "./GenreCheckbox.vue";

export default {
  data() {
    return {
      show: false,
      // selectedGenres: [],
    };
  },
  components: {
    GenreCheckbox
  },
  computed: {
    ...mapState(useBooks, ["genres"]),
    ...mapWritableState(useBooks, ["selectedGenres"]),
  },
  methods: {
    genreChecked(genre) {
      if (genre.value) {
        this.selectedGenres.push(genre.label)
      } else {
        this.selectedGenres = this.selectedGenres.filter(g => g !== genre.label)
      }
    }
  }
};
</script>

<style scoped>
.genres {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

p {
  font-size: 22px;
}

input[type="checkbox"] {
  display: none;
  color: #eeee;
}

.label {
  border: 1px solid #232931;
  background-color: #232931;
  display: block;
  padding: 10px;
  border-radius: 30px;
  font-size: 18px;
  margin-top: 5px;
  /* background: url("unchecked.png") no-repeat left center; */
  /* padding-left: 15px; */
}

input[type="checkbox"]:checked+.label {
  border: 1px solid #4ecca3;
  color: #fff;
  /* background-image: url("checked.png"); */
}

.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Old versions of Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  padding: 2px;
}

.genreButton {
  display: block;
  width: 50%;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
}

@media (hover: hover) {
  .noselect:hover {
    cursor: pointer;
  }

  input[type="checkbox"]:hover+.label {
    border: 1px solid #4ecca3;
    /* background-image: url("checked.png"); */
  }

  p:hover {
    background-color: #232931;
    border-radius: 10px;
  }
}
</style>