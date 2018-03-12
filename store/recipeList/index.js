import recipeList from './recipe_list.json'

// JSON:
// {
//     "Result": "Silver Arrowhead",
//     "Recipe Type": "Arrows",
//     "Part 1": "Anvil",
//     "Part 2": "Silver Bar",
//     "Skill": "Crafting",
//     "Level": "2"
// }

// What we need:
// {

//     "Silver Arrowhead": {
//         "recipeType": "Arrows",
//         "part1": "Anvil",
//         "part2": "Silver Bar",
//         "skill": "Crafting",
//         "level": "2",
//         "subCraft": {
//             "part1": {
//                 ....
//             },
//             "part2": {
//                 ....
//             }
//         }
//     }
// }

let recipeMap = new Map();


recipeList.sort(({Result: a}, {Result: b}) => {
    return a.localeCompare(b)
}).forEach((obj) => {
    // remap keys
    let {
        'Result': result,
        'Recipe Type': recipeType,
        'Part 1': part1,
        'Part 2': part2,
        'Skill': skill,
        'Level': level
    } = obj;

    recipeMap.set(result, {
        recipeType,
        part1,
        part2,
        skill,
        level
    });
});

// augment list
const mapKeys = Array.from(recipeMap.keys());

recipeMap.forEach((value, key, map) => {
    const {part1, part2} = value,
        parts = part1 == part2 ? [part1] : [part1, part2],
        treatedKeys = mapKeys.filter((mapKey) => { return mapKey != key});
    let subCraft = [],
        alreadyInserted = {};
    treatedKeys.forEach((treatedKey) => {
        parts.forEach((part) => {
            const treatedKeyLowerCased = treatedKey.toLowerCase(),
                partLowerCased = part.toLowerCase();

            if (part == key || treatedKey == key) {
                return
            }

            if (treatedKeyLowerCased == partLowerCased || treatedKeyLowerCased.indexOf(partLowerCased) != -1) {

                if (!alreadyInserted[part] && map.get(treatedKey)) {
                    alreadyInserted[treatedKey] = true;

                    subCraft.push(
                        new Proxy({}, {
                            get (target, name) {
                                if (name == 'name') {
                                    return treatedKey
                                }
                                return map.get(treatedKey)[name]
                            }
                        })
                    )
                }

            }
        })
    })

    map.set(
        key,
        Object.assign({},
            value,
            { subCraft }
        )
    )
})

// let a = Array.from(recipeMap).filter((arr) => {
//     return arr[0].indexOf('Blank') != -1
// });


// console.log(JSON.stringify(a, null, '\t'));

// console.log(JSON.stringify(Array.from(recipeMap)[0][1].subCraft[0].proxyData.subCraft, null, '\t'));

// console.log(JSON.stringify(Array.from(recipeMap)[0], null, '\t'));

export default recipeMap
