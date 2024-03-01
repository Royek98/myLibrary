<template>
    <button id="nav-toggle" type="button" :class="toggleNav ? 'toggled' : ''" @click="editToggleNav">
        <i :class="toggleNav ? 'fa fa-times' : 'fa fa-bars'"></i>
    </button>
    <nav id="menu" v-if="toggleNav">
        <home-menu v-if="menuPicker"></home-menu>
        <reader-menu v-else></reader-menu>
    </nav>
</template>

<script>
import HomeMenu from "./HomeMenu.vue";
import ReaderMenu from "./ReaderMenu.vue";
import { useWindowSize } from '@vueuse/core';

export default {
    components: {
        HomeMenu,
        ReaderMenu,
    },
    data() {
        return {
            toggleNav: window.innerWidth > 765
        };
    },
    computed: {
        menuPicker() {
            if (this.$route.name == 'reader') {
                return false;
            }
            return true;
        },
        getWidth() {
            const { width, height } = useWindowSize()
            return width.value;
        }
    },
    watch: {
        getWidth(newValue, oldValue) {
            if (newValue > 765 && this.toggleNav == false) {
                this.toggleNav = true;
            } else if (newValue <= 765 && this.toggleNav == true) {
                this.toggleNav = false;
            }
        },
    },
    methods: {
        editToggleNav() {
            this.toggleNav = !this.toggleNav;
        }
    }
}

</script>

<style scoped>
@media (max-width: 766px) {
    #menu {
        /* display: none; */
        width: 100%;
    }

    #nav-toggle {
        font-size: 30px;
    }

    .toggled {
        float: right;
    }

    nav {
        margin-top: 3px !important;
    }
}

@media (min-width: 766px) {
    #nav-toggle {
        display: none !important;
    }
}

nav {
    float: left;
    width: 16vw;
    text-align: center;
    background-color: #393e46;
    height: 100vh;
    margin-top: -2px;
}


@media only screen and (max-width: 1500px) {
    nav {
        overflow-y: scroll;
        scrollbar-color: #4ECCA3 #393E46;
        scrollbar-width: thin;
    }
}

@media (max-height: 600px) {
    nav {
        overflow-y: scroll;
        scrollbar-color: #4ECCA3 #393E46;
        scrollbar-width: thin;
        -webkit-overflow-scrolling: touch; 
    }
}
</style>