class Item {
    constructor(itemJSON) {
        this.items.id = itemJSON.items.id
        this.items.name = itemJSON.items.name
        this.items.price = storeJSON.items.price
        this.items.quantity = storeJSON.items.quantity
    }

    renderLi() {
        return `<li data-id=${this.id}>${this.name}</li>`
    }
}