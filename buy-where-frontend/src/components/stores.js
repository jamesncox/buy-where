class Stores {
    constructor() {
        this.stores = []
        this.adapter = new StoresAdapter()
        this.storeBindingsAndEventListeners()
        this.fetchAndLoadStores()
    }

    storeBindingsAndEventListeners() {
        this.storesContainer = document.getElementById('stores-container')
        // this.storeNameId = document.getElementById('name-of-store')

        this.body = document.querySelector('body')

        this.newStoreName = document.getElementById('new-store-name')
        this.storeForm = document.getElementById('new-store-form')

        this.newItemForm = document.getElementById('new-item-form')

        this.storeForm.addEventListener('submit', this.createStore.bind(this))
        this.storesContainer.addEventListener('dblclick', this.handleStoreClick.bind(this))
        // this.storeNameId.addEventListener('dblclick', this.handleStoreClick.bind(this))

        this.body.addEventListener('blur', this.updateStore.bind(this), true)
    }

    createStore(e) {
        e.preventDefault()
        const value = this.newStoreName.value

        this.adapter.createStore(value).then(store => {
            this.stores.push(new Store(store))
            this.newStoreName.value = ''
            this.renderStore()
        })
    }

    handleStoreClick(e) {
        this.toggleStore(e)
    }

    toggleStore(e) {
        if (e.target.classList.contains('store-name')) {
            e.preventDefault()
            const li = e.target
            li.contentEditable = true
            li.focus()
            li.classList.add('editable')
        }
    }

    updateStore(e) {
        if (e.target.classList.contains('store-name')) {
            const li = e.target
            li.contentEditable = false
            li.classList.remove('editable')
            const newValue = li.innerHTML
            const id = li.dataset.id
            this.adapter.updateStore(newValue, id)
        }
    }

    fetchAndLoadStores() {
        this.adapter
            .getStores()
            .then(stores => {
                stores.forEach(store => this.stores.push(new Store(store)))
            })
            .then(() => {
                this.renderStore()
            })
    }

    renderStore() {
        const storesContainer = document.getElementById('stores-container')

        const storeHTML = this.stores.map(store => {
            const itemHTML = store.items.map(i => i.tableHTML).join('')

            return store.html(itemHTML)
        }).join('')
        storesContainer.innerHTML = storeHTML

        this.invokeItemListeners()
    }

    invokeItemListeners() {
        this.addItemButton = document.getElementById('add-item-button')
        console.log(this.addItemButton)
        this.addItemButton.addEventListener('click', this.renderNewItemForm.bind(this))
    }

    renderNewItemForm() {
        console.log('clicked...')

        this.newItemForm = document.getElementById('new-item-form')
        console.log(newItemForm)

        newitemForm.style.display = 'block'
    }

}