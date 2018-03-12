import recipeList from './recipeList/index.js'
import searchField from './searchField.js'
import craftMatch from './craftMatch.js'

let store = {
    recipeList
};

new searchField({
    store,
    el: '.search-field'
})

new craftMatch({
    store,
    el: '.craft-match'
})
