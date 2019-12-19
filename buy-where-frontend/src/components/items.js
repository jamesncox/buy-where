class Items {
    constructor() {
        this.items = []
        this.adapter = new ItemsAdapter()
        this.itemBindingsAndEventListeners()
        this.fetchAndLoadItems()
    }

    itemBindingsAndEventListeners() {
        this.itemsContainer = document.getElementById('items-container')
        this.storesContainer = documenet.getElemenyById('stores-container')

        this.body = document.querySelector('body')
        this.newItemName = document.getElementById('new-item-name')
        this.newItemPrice = document.getElementById('new-item-price')
        this.newItemQuantity = document.getElementById('new-item-quantity')

        this.itemForm = document.getElementById('new-item-form')
        this.itemForm.addEventListener('submit', this.createItem.bind(this))
        this.storesContainer.addEventListener('dblclick', this.handleItemClick.bind(this))
        this.body.addEventListener('blur', this.updateItem.bind(this), true)
    }

    createItem(e) {
        e.preventDefault()
        const itemName = this.newItemName.value
        const itemPrice = this.newItemPrice.value
        const itemQuantity = this.newItemQuantity.value

        this.adapter.createItem(itemName, itemPrice, itemQuantity).then(item => {
            this.items.push(new Item(item))
            this.newItemName.value = ''
            this.newItemPrice.value = ''
            this.newItemQuantity.value = ''
            this.renderItem()
        })
    }

    handleItemClick(e) {
        this.toggleItem(e)
    }

    toggleItem(e) {
        if (e.target.tagName === 'TD') {
            e.preventDefault()
            const li = e.target
            li.contentEditable = true
            li.focus()
            li.classList.add('editable')
        }
    }

    updateItem(e) {
        if (e.target.tagName === 'TD') {
            const li = e.target
            li.contentEditable = false
            li.classList.remove('editable')
            const newValue = li.innerHTML
            const id = li.dataset.id
            this.adapter.updateItem(newValue, id)
        }
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
        const itemsContainer = document.getElementById('items-container')

        const storeHTML = this.stores.map(store => {
            const itemHTML = store.items.map(i => i.tableHTML).join('')

            return store.html(itemHTML)
        }).join('')
        itemsContainer.innerHTML = storeHTML
    }

}