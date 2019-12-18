class Items {
    constructor() {
        this.items = []
        this.adapter = new ItemsAdapter()
        this.itemBindingsAndEventListeners()
        this.fetchAndLoadItems()
    }

    itemBindingsAndEventListeners() {
        this.storesContainer = document.getElementById('stores-container')
        this.body = document.querySelector('body')

        this.newItemName = document.getElementById('new-item-name')
        this.newItemPrice = document.getElementById('new-item-price')
        this.newItemQuantity = document.getElementById('new-item-quantity')

        this.itemForm = document.getElementById('new-item-form')
        this.itemForm.addEventListener('submit', this.createItem.bind(this))
        this.storesContainer.addEventListener('dblclick', this.handleStoreClick.bind(this))
        this.body.addEventListener('blur', this.updateStore.bind(this), true)
    }

    createItem(e) {
        e.preventDefault()
        const value = this.newStoreName.value

        this.adapter.createStore(value).then(store => {
            this.stores.push(new Store(store))
            this.newStoreName.value = ''
            this.renderStore()
        })
    }

    handleItemClick(e) {
        this.toggleStore(e)
    }

    toggleItem(e) {
        e.preventDefault()
        const li = e.target
        li.contentEditable = true
        li.focus()
        li.classList.add('editable')
    }

    updateItem(e) {
        const li = e.target
        li.contentEditable = false
        li.classList.remove('editable')
        const newValue = li.innerHTML
        const id = li.dataset.id
        this.adapter.updateStore(newValue, id)
    }

    fetchAndLoadItems() {
        this.adapter
            .getItems()
            .then(items => {
                items.forEach(item => this.items.push(new Item(item)))
            })
            .then(() => {
                this.renderItem()
            })
    }

    renderItem() {
    }
}