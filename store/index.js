import Vuex from 'vuex'
import recipeMap from './recipeList/index.js'

const createStore = () => {
    return new Vuex.Store({
        state: {
            search: ''
        },
        mutations: {
            updateSearch (state, {value}) {
                state.search = value
            }
        },
        getters: {
            recipeList ({search}) {
                const stringToMatch = search.toLowerCase(),
                    limit = 50;

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

                if (result.length > limit) {
                    pages = Math.ceil(result.length / limit);
                    result.length = limit;
                }

                return {
                    pages,
                    data: result
                }
            },
            recipe () {
                return function ({name}) {
                    return Object.assign({name}, recipeMap.get(name));
                }
            }
        },
        actions: {
            nuxtServerInit ({ commit }, { req }) {
                // if (req.session.user) {
                //     commit('user', req.session.user)
                // }
            },
            updateSearch ({commit}, {value}) {
                commit('updateSearch', {value})
            }
        }
    })
}

export default createStore
