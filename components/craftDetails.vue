<template>
    <dl>
        <dt>name</dt>
        <dd>{{ name }}</dd>
        <dt>recipeType</dt>
        <dd>{{ recipeType }}</dd>
        <dt>skill</dt>
        <dd>{{ skill }}</dd>
        <dt>level</dt>
        <dd>{{ level }}</dd>
        <dt>part1</dt>
        <dd>{{ part1 }}</dd>
        <dt>part2</dt>
        <dd>{{ part2 }}</dd>
    </dl>
</template>

<script>
export default {
    props: ['item'],
    computed: {
        name () {
            return this.item.name
        },
        recipeType () {
            return this.item.recipeType
        },
        skill () {
            return this.item.skill
        },
        level () {
            return this.item.level
        },
        part1 () {
            return this.item.part1
        },
        part2 () {
            return this.item.part2
        },
    }
}
</script>

<style>
    dt, dd {
        display: inline-block;
    }

    dt {
        font-weight: bold;
    }

    dt:after {
        content: ': ';
        white-space: pre;
    }

    dd {
        margin-right: 20px;
    }

</style>
