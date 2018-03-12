<template>
    <input type="text" v-model="search">
</template>

<script>
let timer;

export default {
    computed: {
        search: {
            get () {
                return this.$store.state.search
            },
            set (value) {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    this.$store.dispatch('updateSearch', {value})
                }, 100)
            }
        }
    }
}
</script>

<style>

</style>
