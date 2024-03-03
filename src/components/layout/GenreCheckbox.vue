<template>
    <div>
        <label class="noselect">
            <input type="checkbox" v-model="value" @change="emitCheckbox($event.target.checked)" />
            <span class="label">{{ label }}</span>
        </label>
    </div>
</template>

<script>
export default {
    props: ["label", "value"],
    emits: ["genreChecked"],
    methods: {
        emitCheckbox(checked) {
            this.$emit('genreChecked', { 'label': this.label, 'value': checked })
        }
    }
}
</script>

<style scoped>
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

.noselect:hover {
    cursor: pointer;
}

input[type="checkbox"] {
    display: none;
    color: #eeee;
}

input[type="checkbox"]:checked+.label {
    border: 1px solid #4ecca3;
    color: #fff;
}

.checked {
    border: 1px solid #4ecca3;
    color: #fff;
}

@media (hover: hover) {
    input[type="checkbox"]:hover+.label {
        border: 1px solid #4ecca3;
    }
}


.label {
    border: 1px solid #232931;
    background-color: #232931;
    display: inline-block;
    padding: 10px;
    border-radius: 30px;
    font-size: 18px;
    margin-top: 5px;
}
</style>