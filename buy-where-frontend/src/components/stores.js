class Stores {
    constructor() {
        this.stores = []
        this.lists = []
        this.adapter = new StoresAdapter()
        this.storeBindingsAndEventListeners()
        this.itemBindingsAndEventListeners()
        this.fetchAndLoadNotes()
    }

    storeBindingsAndEventListeners() {
        this.storesContainer = document.getElementById('stores-container')
        this.name = document.querySelector('name')
        this.newStoreName = document.getElementById('store-name')
        this.storeForm = document.getElementById('new-store-form')
        this.storeForm.addEventListener('submit', this.createStore.bind(this))
        this.storesContainer.addEventListener('dblclick', this.handleStoreClick.bind(this))
        this.name.addEventListener('blur', this.updatStore.bind(this), true)
    }

    itemBindingsAndEventListeners() {

    }

    createStore(e) {
        e.preventDefault()
        const value = this.newStoreName.value

        this.adapter.createStore(value).then(store => {
            this.stores.push(new Store(store))
            this.newStoreName.value = ''
            this.render()
        })
    }

    handleNoteClick(e) {
        this.toggleStore(e)
    }

    toggleStore(e) {
        const li = e.target
        li.contentEditable = true
        li.focus()
        li.classList.add('editable')
    }

    updateStore(e) {
        const li = e.target
        li.contentEditable = false
        li.classList.remove('editable')
        const newValue = li.innerHTML
        const id = li.dataset.id
        //console.log(id)
        this.adapter.updateStore(newValue, id)
    }

    fetchAndLoadStores() {
        this.adapter
            .getStores
            .then(stores => {
                stores.sort((a, b) => a.id - b.id).forEach(store => this.store.push(new Store(store)))
            })
            .then(() => {
                this.render()
            })
    }

    render() {
        this.storesContainer.innerHTML = this.stores.map(store => store.renderLi()).join('')
    }
}