<template>

  <!-- <select name="cars" id="cars" class="custom-select">
    <option value="volvo">Alphabetically ASC</option>
    <option value="saab">Alphabetically DESC</option>
    <option value="mercedes">Author ASC</option>
    <option value="mercedes">Author DESC</option>
    <option value="audi">Date ASC</option>
    <option value="audi">Date DESC</option>
  </select> -->
  <p>Sort By:</p>
  <ul @click="clicked" class="noselect">
    <li
      :class="{'show': isClicked}"
      v-for="(sort, index) in sortBy"
      :key="sort"
      @click="getIndex(index)"
    >
      <span :class="{'fa fa-bars' : index === 0}">&nbsp; {{ sort }}</span>
    </li>
  </ul>
</template>

<script>
import { useBooks } from "../../stores/useBooks.js";
import { mapState } from "pinia";

export default {
  data() {
    return {
      isClicked: false,
      // sortBy: ['Alphabetically', 'Author', 'Date'],
    };
  },
  computed: {
    ...mapState(useBooks, ["sortBy"]),
  },
  methods: {
    clicked() {
      this.isClicked = !this.isClicked;
    },
    getIndex(index) {
      if (this.isClicked) {
        const test = this.sortBy[index];
        this.sortBy.splice(index, 1);
        this.sortBy.unshift(test);
      }
    },
  },
};
</script>

<style scoped>
p {
  font-size: 22px;
}
li:first-of-type {
  visibility: inherit;
}

ul {
  list-style-type: none;
  width: 100%;
  padding: 0;
}

li {
  visibility: hidden;
  padding: 5px;
}

li:hover {
  background-color: #232931;
  border-radius: 10px;
}

li.show {
  visibility: visible;
}


.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  text-align: center;
}

.noselect:hover {
  cursor: pointer;
} 
</style>