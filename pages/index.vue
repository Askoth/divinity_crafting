<template>
<div>
    <h1 class="title">
        Divinity Crafting Trees
    </h1>

    <searchFieldComp class="search-field"></searchFieldComp>

    <div class="pages">Pages: {{craftMatchedList.pages}}</div>

    <ul>
        <craftMatch
            class="crafted-item"
            v-for="(item, index) in craftMatchedList.data"
            v-bind:key="index"
            v-bind:item="item"
        >
        </craftMatch>
    </ul>


</div>
</template>

<script>
import searchFieldComp from '~/components/searchField.vue'
import craftMatch from '~/components/craftMatch.vue'

export default {
    computed: {
        craftMatchedList () {
            return this.$store.getters.recipeList
        }
    },
    components: {
        searchFieldComp,
        craftMatch
    }
}
</script>

<style>
.title {
    margin: 10px 0 20px;
}

.search-field {
    width: 100%;
    height: 2.5em;
    padding: 5px 10px;
    font-size: 14px;
}

.pages {
    margin: 10px 0;
}

.crafted-item {
    padding: 20px 30px 20px 30px;
    border: 1px solid #000;
    border-top: none;
}

.crafted-item:first-child {
    border-top: 1px solid #000;
}

.crafted-item:nth-child(2n) {
    background: #DDD;
}
</style>
