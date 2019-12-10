class Store {
    constructor(storeJSON) {
        this.id = storeJSON.id
        this.name = storeJSON.name
        // this.items.name = storeJSON.items.name
        // this.items.price = storeJSON.items.price
        // this.items.quantity = storeJSON.items.quantity
    }

    renderLi() {
        return `<li data-id=${this.id}>${this.name}</li>`
    }
}