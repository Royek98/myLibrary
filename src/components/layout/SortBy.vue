<template>
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
  display: block;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
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

span {
  font-size: 18px;
}
</style>