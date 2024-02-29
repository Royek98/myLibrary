<template>
     
    <span><i class="fa fa-search">&nbsp;</i><input type="text" placeholder="Title, Author" v-model.trim="inputSearch"/></span>
   
</template>

<script>
import { useBooks } from "../../stores/useBooks.js";
import { mapWritableState } from "pinia";


export default {
    computed: {
        ...mapWritableState(useBooks, ["inputSearch"]),
    },
}
</script>

<style scoped>
span {
    display: inline-block;
    margin-top: 8vh;
}
input[type=text] {
    background-color: #393E46;
    border: 1px solid #232931;
    padding: 1vh;
    color: #EEEE;
    border-radius: 2vw;
    font-size: 18px;
    width: 12vw;
}

@media (max-width: 766px) {
    input[type=text] {
    width: 80vw !important;
  }
}


</style>