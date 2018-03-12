<template>
    <li>
        <craftDetails v-bind:item="item"></craftDetails>

        <ul v-if="hasSubcraft" class="sub-craft-list">
            <craftMatch
                v-for="(part, index) in subCraft"
                class="sub-craft"
                v-bind:key="index"
                v-bind:item="part"></craftMatch>
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
        hasSubcraft () {
            return this.subCraft && this.subCraft.length > 0
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
