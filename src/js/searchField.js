
const template = `
    <input type="text" class="search-field" v-model="search">
`;

class searchField {
    constructor ({store, el}) {
        this.template = template;
        this.store = store;
        this.el = Array.from(document.querySelectorAll(el));

        this.render()
    }

    render () {
        this.el.forEach((el) => {
            el.outerHTML = this.template;
        })
    }


}

export default searchField
