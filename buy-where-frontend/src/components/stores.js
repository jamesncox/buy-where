class Stores {

    //create and initialize obects related to Stores class.
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
        this.storesContainer.addEventListener('dblclick', this.handleStoreOrItemClick.bind(this))
        this.body.addEventListener('blur', this.updateStoreOrItem.bind(this), true)
    }

    //call on the createStore() function in StoresAdapter to create a new store name.
    createStore(e) {
        e.preventDefault()
        const value = this.newStoreName.value

        this.storesAdapter.createStore(value).then(store => {
            this.stores.push(new Store(store))
            this.newStoreName.value = ''
            this.renderStore()
        })
    }

    //call on toggleStore() when store is double clicked.
    handleStoreOrItemClick(e) {
        this.editStoreOrItem(e)
    }

    //set the store name element to become editable when clicked on.
    editStoreOrItem(e) {
        if (e.target.classList.contains('store-name')) {
            e.preventDefault()
            const li = e.target
            li.contentEditable = true
            li.focus()
            li.classList.add('editable')
        }

        if (e.target.classList.contains('item-name') || e.target.classList.contains('item-price') || e.target.classList.contains('item-quantity')) {
            e.preventDefault()
            const li = e.target
            li.contentEditable = true
            li.focus()
            li.classList.add('editable')
        }
    }

    //if store-name element is clicked, send the updated value to the database when the user clicks away on another element.
    updateStoreOrItem(e) {
        if (e.target.classList.contains('store-name')) {
            const li = e.target
            li.contentEditable = false
            li.classList.remove('editable')
            const newValue = li.innerHTML
            const id = li.dataset.id
            this.storesAdapter.updateStore(newValue, id)
        }

        if (e.target.classList.contains('item-name') || e.target.classList.contains('item-price') || e.target.classList.contains('item-quantity')) {
            const td = e.target
            const newName = td.innerHTML
            const newPrice = td.innerHTML
            const newQuantity = td.innerHTML
            console.log(newName, newPrice, newQuantity)
            //each item property becomes the newly edited value no matter which element i double click on, they all become that new value.

            td.contentEditable = false
            td.classList.remove('editable')

            const id = td.dataset.id
            this.itemsAdapter.updateItem(newName, newPrice, newQuantity, id)
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

    //bind new dynamically created elements and set event listeners for new elements.
    invokeItemListeners() {
        this.addItemButton = document.querySelectorAll('#add-item-button')
        this.newItemForms = document.querySelectorAll('#new-item-form')

        for (let form of this.newItemForms) {
            form.addEventListener('submit', this.createItems.bind(this))
        }

        if (this.addItemButton) {
            this.addItemButton.forEach(button => {
                button.addEventListener('click', this.renderNewItemForm.bind(this))
            })
        }
    }

    //display new-item-form when Edit Item button is clicked.
    renderNewItemForm(e) {
        const form = e.target.parentElement.querySelector('form')
        form.style.display = 'block'
    }

    //create new item in new-item-form and send to the database.
    createItems(e) {
        e.preventDefault()

        const loader = document.createElement('div')
        loader.className = 'loader'
        e.target.parentElement.appendChild(loader)

        const [name, price, quantity, _] = e.target.querySelectorAll('input')
        const itemName = name.value
        const itemPrice = price.value
        const itemQuantity = quantity.value
        const storeId = e.target.dataset.id

        this.itemsAdapter.createItem(itemName, itemPrice, itemQuantity, storeId).then(item => {
            const store = this.stores.find(s => s.id == storeId)
            e.target.parentElement.removeChild(loader)
            store.items.push(new Item(item))
            e.target.hidden = true
            this.renderStore()
        })
    }

}