<template>
  <teleport to="body">
    <router-link to="/" v-if="!editing"
      ><div class="backdrop" @click="$emit('close')" v-if="show"></div>
    </router-link>
    <div class="backdrop" v-if="show && editing"></div>
    <dialog open v-if="show">
      <router-link to="/" v-if="!editing"
        ><button class="close" @click="$emit('close')"><span class="fa fa-times"></span></button></router-link
      >
      <div class="left">
        <slot name="poster"></slot>
        <div class="genres"><slot name="genres"></slot></div>
      </div>
      <div class="right">
        <h1><slot name="title"></slot></h1>
        <h2><slot name="author"></slot></h2>
        <slot name="read"></slot> <br />
        <p><slot name="description"></slot></p>
      </div>
      <div class="bottom">
        <p class="chapters">Chapters</p>
        <slot name="chapters"></slot>
      </div>
    </dialog>
  </teleport>
</template>

<script>
import { useBooks } from "../../stores/useBooks.js";
import { mapState } from "pinia";
export default {
  props: ["show"],
  emits: ["close"],
  computed: {
    ...mapState(useBooks, ['editing'])
  }
};
</script>

<style scoped>
dialog {
  position: fixed;
  top: 6vh;
  left: 10%;
  width: 77vw;
  z-index: 100;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  padding: 25px;
  margin: 0;
  overflow: hidden;
  background-color: #232931;
  max-height: 80vh;
  overflow-y: scroll;
  scrollbar-color: #4ECCA3 #232931;
  scrollbar-width: thin;
  color: #EEEEEE;
  font-family: "Roboto", sans-serif;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 110vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
  cursor: default;
}

.close {
  cursor: pointer;
  border: none;
  background-color: inherit;
  color: #EEEEEE;
  font-size: 40px;
  font-family: "Permanent Marker";
  position: absolute;
  top: -5px;
  right: 10px;
}

.close:hover {
  color: #4ECCA3;
}

/* div {
  float: left;
  width: 58vw;
  padding-left: 25px;
  margin-top: -10px;
} */

P {
  font-size: 20px;
  clear: both;
}

.chapters {
  font-size: 25px;
  padding-left: 40px;
}

.genres {
  clear: both;
  /* max-width: 200px; */
  /* margin-left: -45px; */
}

.left {
  max-width: 300px;
  float: left;
  padding-bottom: 20px;
  display: block;
}

.right {
  float: left;
  margin-left: 2vw;
  width: 50vw;
  display: block;
}

.bottom {
  clear: both;
}
</style>