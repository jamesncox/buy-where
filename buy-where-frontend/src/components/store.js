class Store {
    constructor(storeJSON) {
        this.id = storeJSON.id
        this.name = storeJSON.name
        this.items = storeJSON.items.map(io => new Item(io))
    }

    renderStoreLi(items = '') {
        return `<li data-id=${this.id}>${this.name}</li>`
        return `<li data-id=${this.id}>${this.name} <ul> ${renderItemLi(items)} </ul></li>`
    }

    formHTML() {
        // this will render a hidden field form that allows someone to create item name, price, quantity after store is created
    }
}