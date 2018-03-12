<template>
    <li>
        <craftDetails v-bind:item="item"></craftDetails>

        <ul v-if="hasSubcraft" class="sub-craft-list">
            <craftMatch v-if="hasSubcraftPart1"
                class="sub-craft"
                v-bind:item="subcraftPart1"></craftMatch>

            <craftMatch v-if="hasSubcraftPart2"
                class="sub-craft"
                v-bind:item="subcraftPart2"></craftMatch>
        </ul>
    </li>
</template>

<script>

import craftDetails from './craftDetails.vue'

export default {
    name: 'craftMatch',
    props: ['item'],
    computed: {
        subCraft () {
            return this.item.subCraft
        },
        hasSubcraftPart1 () {
            return this.subCraft && typeof this.subCraft.part1 != 'undefined'
        },
        hasSubcraftPart2 () {
            return this.subCraft && typeof this.subCraft.part2 != 'undefined'
        },
        hasSubcraft () {
            return this.hasSubcraftPart1 || this.hasSubcraftPart2
        },
        subcraftPart1 () {
            return this.$store.getters.recipe({name: this.subCraft.part1})
        },
        subcraftPart2 () {
            return this.$store.getters.recipe({name: this.subCraft.part2})
        }
    },
    components: {
        craftDetails
    }
}
</script>

<style>

    ul, li {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .sub-craft-list {
        margin-bottom: 30px;
    }

    .sub-craft {
        margin: 10px 0 10px 30px;
    }

</style>
