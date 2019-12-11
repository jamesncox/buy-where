class Store {
    constructor(storeJSON) {
        this.id = storeJSON.id
        this.name = storeJSON.name
    }

    renderLi() {
        return `<li data-id=${this.id}>${this.name}</li>`
    }
}