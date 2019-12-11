class Store {
    constructor(storeJSON) {
        this.id = storeJSON.id
        this.name = storeJSON.name
        // this.items = storeJSON.items.map(io => new Item(io))
        //line 5 isn't working. :(
    }

    renderLi() {
        return `<li data-id=${this.id}>${this.name}</li>`
    }

    formHTML() {
        // this will render a hidden field form that allows someone to create item name, price, quantity
    }
}