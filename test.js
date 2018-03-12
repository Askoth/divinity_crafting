'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _recipe_list = require('./recipe_list.json');

var _recipe_list2 = _interopRequireDefault(_recipe_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var recipeMap = new Map();

_recipe_list2.default.forEach(function (obj) {
    // remap keys
    var result = obj['Result'],
        recipeType = obj['Recipe Type'],
        part1 = obj['Part 1'],
        part2 = obj['Part 2'],
        skill = obj['Skill'],
        level = obj['Level'];


    recipeMap.set(result, {});
});

exports.default = _recipe_list2.default;
