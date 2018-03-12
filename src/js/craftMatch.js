

class craftDetails {
    constructor ({store, el = null}) {
        this.store = store;

        if (el != null) {
            this.el = Array.from(document.querySelectorAll(el));

            this.el.forEach((el) => {
                this.render()
            })
        }
    }

    render ({name, recipeType, skill, level, part1, part2}) {
        return `
            <dl>
                <dt>name</dt>
                <dd>${name}</dd>
                <dt>recipeType</dt>
                <dd>${recipeType}</dd>
                <dt>skill</dt>
                <dd>${skill}</dd>
                <dt>level</dt>
                <dd>${level}</dd>
                <dt>part1</dt>
                <dd>${part1}</dd>
                <dt>part2</dt>
                <dd>${part2}</dd>
            </dl>
        `;
    }
}



class craftMatch {
    constructor ({store, el}) {
        this.store = store;
        this.el = Array.from(document.querySelectorAll(el));

        this.components = {
            craftDetails: new craftDetails({store: this.store})
        }

        this.el.forEach((el) => {

            let recipeList = Array.from(this.store.recipeList).reduce((prev, cur) => {

                let result = cur[1];

                result['name'] = cur[0];

                prev.push(result)

                return prev
            }, []);

            el.outerHTML = this.render(recipeList)
        })
    }

    render (recipeList) {
        let output = '';

        if (!recipeList || recipeList.length < 1) {
            return ''
        }

        console.log(
            recipeList.map((obj) => {return obj.name})
        );

        recipeList.forEach((recipe) => {
            output += this.interpolate`
                <li>
                    ${this.components.craftDetails.render(recipe)}

                    <ul v-if="hasSubcraft" class="sub-craft-list">
                        ${this.render(recipe.subCraft)}
                    </ul>
                </li>
            `;
        })

        // console.log('[output]', output)

        return output
    }

    interpolate (strings) {
        let inputs = Array.from(arguments).slice(1);
        let result = strings.reduce((prev, cur) => {

            prev += cur;

            prev += inputs.shift();

            return prev

        }, '')


        return result
    }
}

export default craftMatch
