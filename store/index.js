import Vuex from 'vuex'
import recipeMap from './recipeList/index.js'
import url from 'url'

const createStore = () => {
    return new Vuex.Store({
        state: {
            search: '',
            tableView: false
        },
        mutations: {
            updateSearch (state, {value}) {
                state.search = value
            },
            updateTableView (state, {value}) {
                state.tableView = value
            }
        },
        getters: {
            recipeList ({search}) {
                return function ({limit = 50} = {}) {
                    const stringToMatch = search.toLowerCase();

                    let result = [],
                        pages = 0;

                    Array.from(recipeMap.keys()).forEach((key) => {
                        let value = recipeMap.get(key);
                        const itemName = key.toLowerCase();
                        if (itemName.indexOf(stringToMatch) != -1) {
                            const {recipeType, skill, level, part1, part2, subCraft} = value;
                            result.push({
                                name: itemName,
                                recipeType,
                                skill,
                                level,
                                part1,
                                part2,
                                subCraft
                            })
                        }
                    })

                    if (limit != false && result.length > limit) {
                        pages = Math.ceil(result.length / limit);
                        result.length = limit;
                    }

                    return {
                        pages,
                        data: result
                    }
                }
            },
            recipe () {
                return function ({name}) {
                    return Object.assign({name}, recipeMap.get(name));
                }
            },
            urlTableQuery (state) {
                return {
                    table: state.tableView ? 1 : 0
                }
            }
        },
        actions: {
            nuxtServerInit ({ commit }, { req }) {

                // cannot rely on this action to update store as
                // in github it's a static page

            },
            updateSearch ({commit}, {value}) {
                commit('updateSearch', {value})
            },
            updateTableView ({commit}, {value}) {
                commit('updateTableView', {value})
            }
        }
    })
}

export default createStore
