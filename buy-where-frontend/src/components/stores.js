class Stores {
    constructor() {
        this.stores = []
        this.items = []
        this.storesAdapter = new StoresAdapter()
        this.itemsAdapter = new ItemsAdapter()
        this.storeBindingsAndEventListeners()
        this.fetchAndLoadStores()
    }

    //bind html elements related to Store and sets eventListeners for user interactions.
    storeBindingsAndEventListeners() {
        this.storesContainer = document.getElementById('stores-container')
        this.body = document.querySelector('body')
        this.newStoreName = document.getElementById('new-store-name')
        this.storeForm = document.getElementById('new-store-form')

        this.storeForm.addEventListener('submit', this.createStore.bind(this))
        this.storesContainer.addEventListener('dblclick', this.handleStoreClick.bind(this))
        this.body.addEventListener('blur', this.updateStore.bind(this), true)
    }

    //call on the createStore() function in StoresAdapter to create a new store name.
    createStore(e) {
        e.preventDefault()
        const value = this.newStoreName.value

        this.adapter.createStore(value).then(store => {
            this.stores.push(new Store(store))
            this.newStoreName.value = ''
            this.renderStore()
        })
    }

    //call on toggleStore() when store is double clicked.
    handleStoreClick(e) {
        this.toggleStore(e)
    }

    //set the store name element to become editable when clicked on.
    toggleStore(e) {
        if (e.target.classList.contains('store-name')) {
            e.preventDefault()
            const li = e.target
            li.contentEditable = true
            li.focus()
            li.classList.add('editable')
        }
    }

    //if store-name element is clicked, send the updated value to the database when the user clicks away on another element.
    updateStore(e) {
        if (e.target.classList.contains('store-name')) {
            const li = e.target
            li.contentEditable = false
            li.classList.remove('editable')
            const newValue = li.innerHTML
            const id = li.dataset.id
            this.storesAdapter.updateStore(newValue, id)
        }
    }

    //grab all the stores and related items from the database. call on renderStore().
    fetchAndLoadStores() {
        this.storesAdapter
            .getStores()
            .then(stores => {
                stores.forEach(store => this.stores.push(new Store(store)))
            })
            .then(() => {
                this.renderStore()
            })
    }

    //display the stores and items in a format defined in store.js and item.js.
    //call on invokeItemListeners when the dynamically created elements are set.
    renderStore() {
        const storesContainer = document.getElementById('stores-container')

        const storeHTML = this.stores.map(store => {
            const itemHTML = store.items.map(i => i.tableHTML).join('')

            return store.html(itemHTML)
        }).join('')
        storesContainer.innerHTML = storeHTML

        this.invokeItemListeners()
    }

    //bind new dynamically create elements and set event listeners for new elements.
    invokeItemListeners() {
        this.newItemForm = document.getElementById('new-item-form')
        this.addItemButton = document.querySelectorAll('#add-item-button')

        this.newItemForm = document.getElementById('new-item-form')

        this.newItemName = document.getElementById('new-item-name')
        this.newItemPrice = document.getElementById('new-item-price')
        this.newItemQuantity = document.getElementById('new-item-quantity')

        this.newItemForm.addEventListener('submit', this.createItems.bind(this))

        if (this.addItemButton) {
            this.addItemButton.forEach(button => {
                button.addEventListener('click', this.renderNewItemForm.bind(this))
            })
        }
    }

    //display new-item-form when Edit Item button is clicked.
    renderNewItemForm() {
        this.newItemForm.style.display = 'block'
        // only rendering for the first Store in my database....even if I click another store's addItemButton
    }

    //create new item in new-item-form and send to the database.
    createItems(e) {
        e.preventDefault()

        const itemName = this.newItemName.value
        const itemPrice = this.newItemPrice.value
        const itemQuantity = this.newItemQuantity.value

        this.itemsAdapter.createItem(itemName, itemPrice, itemQuantity).then(item => {
            console.log(item)
            // item id and store are "null" so not being saved to the database because not associated with a store?
            this.items.push(new Item(item))
            console.log(this.items)
            this.itemName = ''
            this.itemPrice = ''
            this.itemQuantity = ''
            this.renderStore()
        })

    }

}