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
                    limit = 10;

                let result = [],
                    pages = 0;

                result = Array.from(recipeMap);

                result.length = 1;

                result = result.reduce((prev, cur) => {
                    let a = cur[1];
                    a.name = cur[0];
                    prev.push(a)
                    return prev
                }, [])
                // Array.from(recipeMap.keys()).forEach((key) => {
                //     let value = recipeMap.get(key);
                //     const itemName = key.toLowerCase();
                //     if (itemName.indexOf(stringToMatch) != -1) {
                //         const {recipeType, skill, level, part1, part2, subCraft} = value;
                //         result.push({
                //             name: itemName,
                //             recipeType,
                //             skill,
                //             level,
                //             part1,
                //             part2,
                //             subCraft
                //         })
                //     }
                // })

                if (result.length > limit) {
                    pages = Math.ceil(result.length / limit);
                    result.length = limit;
                }

                return {
                    pages,
                    data: result
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
