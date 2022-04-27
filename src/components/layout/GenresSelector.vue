<template>
  <p class="noselect" @click="show = !show">Genres:</p>
  <div v-if="show">
    <label class="noselect" v-for="genre in genres" :key="genre" :for="genre"
      ><input
        type="checkbox"
        :id="genre"
        :value="genre"
        v-model="selectedGenres"
      />
      <span class="label">{{ genre }}</span>
    </label>
  </div>
  <div v-else>
    <label class="noselect" v-for="genre in selectedGenres" :key="genre" :for="genre"
      ><input
        type="checkbox"
        :id="genre"
        :value="genre"
        v-model="selectedGenres"
      />
      <span class="label">{{ genre }}</span>
    </label>
  </div>
</template>

<script>
import { useBooks } from "../../stores/useBooks.js";
import { mapState, mapWritableState } from "pinia";

export default {
  data() {
    return {
      show: false,
    };
  },
  computed: {
    ...mapState(useBooks, ["genres"]),
    ...mapWritableState(useBooks, ["selectedGenres"]),
  },
};
</script>

<style scoped>
p {
  font-size: 22px;
}
p:hover{
  background-color: #232931;
  border-radius: 10px;
}
input[type="checkbox"] {
  display: none;
  color: #eeee;
}

.label {
  border: 1px solid #232931;
  background-color: #232931;
  display: inline-block;
  padding: 10px;
  border-radius: 30px;
  font-size: 18px;
  margin-top: 5px;
  /* background: url("unchecked.png") no-repeat left center; */
  /* padding-left: 15px; */
}
input[type="checkbox"]:checked + .label {
  border: 1px solid #4ecca3;
  color: #fff;
  /* background-image: url("checked.png"); */
}
input[type="checkbox"]:hover + .label {
  border: 1px solid #4ecca3;
  /* background-image: url("checked.png"); */
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  padding: 2px;
}

.noselect:hover {
  cursor: pointer;
}
</style>