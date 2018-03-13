<template>
<div>
    <h1 class="title">
        Divinity Crafting Trees
    </h1>

    <label>Table View
        <input type="checkbox" v-model="tableView">
    </label>

    <searchFieldComp class="search-field"></searchFieldComp>

    <div class="pages">Pages: {{craftMatchedList.pages}}</div>

    <tableView v-if="tableView"></tableView>

    <ul v-else>
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
import tableView from '~/components/tableView.vue'

export default {
    computed: {
        craftMatchedList () {
            return this.$store.getters.recipeList()
        },
        tableView: {
            get () {
                return this.$store.state.tableView
            },
            set (newValue) {
                this.$store.dispatch('updateTableView', {value: newValue})
            }
        },
        urlTableQuery () {
            return this.$store.getters.urlTableQuery
        }
    },
    watch: {
        urlTableQuery (newValue, oldValue) {
            let query = JSON.parse(JSON.stringify(this.$router.currentRoute.query));

            Object.assign(query, newValue)

            this.$router.push( { query } );
        }
    },
    components: {
        searchFieldComp,
        craftMatch,
        tableView
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
