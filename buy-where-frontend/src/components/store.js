class Store {
    constructor(storeJSON) {
        this.id = storeJSON.id
        this.name = storeJSON.name
        this.items = storeJSON.items.map(io => new Item(io))
    }

    renderLi() {
        return `<li data-id=${this.id}>${this.name}</li>`
    }
}