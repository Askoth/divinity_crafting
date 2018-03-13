<template>
    <table>
        <thead>
            <tr>
                <th><button v-on:click="changeSort('name')">Name</button></th>
                <th><button v-on:click="changeSort('recipeType')">Type</button></th>
                <th><button v-on:click="changeSort('part1')">Part 1</button></th>
                <th><button v-on:click="changeSort('part2')">Part 2</button></th>
                <th><button v-on:click="changeSort('skill')">Skill</button></th>
                <th><button v-on:click="changeSort('level')">Level</button></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(craft, index) in orderedCraftList" v-bind:key="index">
                <td>{{ craft.name }}</td>
                <td>{{ craft.recipeType }}</td>
                <td>{{ craft.part1 }}</td>
                <td>{{ craft.part2 }}</td>
                <td>{{ craft.skill }}</td>
                <td>{{ craft.level }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data () {
        return {
            sortBy: 'name',
            sortOrder: {
                name: true, // true normal, false reverse
                recipeType: true, // true normal, false reverse
                part1: true, // true normal, false reverse
                part2: true, // true normal, false reverse
                skill: true, // true normal, false reverse
                level: true, // true normal, false reverse
            }
        }
    },
    computed: {
        isReverse () {
            return !this.sortOrder[this.sortBy]
        },
        craftList () {
            return this.$store.getters.recipeList({limit: false}).data
        },
        orderedCraftList () {

            const listClone = JSON.parse(JSON.stringify(this.craftList)),
                {sortBy, isReverse} = this;

            if (sortBy == 'level') {
                listClone.sort((a, b) => {
                    return window.parseInt(a[sortBy]) - window.parseInt(b[sortBy])
                });
            } else {
                listClone.sort((a, b) => {
                    return a[sortBy].localeCompare(b[sortBy])
                })
            }

            if (isReverse) {
                listClone.reverse();
            }

            return listClone
        }
    },
    methods: {
        changeSort (key) {
            if (this.sortBy == key) {
                this.sortOrder[this.sortBy] = !this.sortOrder[this.sortBy]
            } else {
                this.sortBy = key;
            }
        }
    }
}

</script>

<style>

table {
    width: 100%;
    border-collapse: collapse;
}

tr:nth-child(2n) {
    background: #ddd;
}

td, th {
    border: 1px solid #AAA;
    padding: 6px;
}

</style>
