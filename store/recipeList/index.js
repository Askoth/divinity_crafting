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

recipeMap.forEach((value, key, map) => {
    let {part1, part2} = value,
        subCraft = {};

    if (map.get(part1)) {
        subCraft.part1 = part1;
    }

    if (map.get(part2)) {
        subCraft.part2 = part2;
    }

    map.set(
        key,
        Object.assign({},
            value,
            { subCraft }
        )
    )
})

export default recipeMap
