class Item {
    constructor(itemJSON) {
        this.items.id = itemJSON.items.id
        this.items.name = itemJSON.items.name
        this.items.price = itemJSON.items.price
        this.items.quantity = itemJSON.items.quantity
    }

    // renderLi() {
    //     return `<li data-id=${this.items.id}>${this.items.name}, ${this.items.price}, ${this.items.quantity}</li>`
    // }
}