class Stores {
    constructor() {
        this.stores = []
        this.adapter = new StoresAdapter()
        this.storeBindingsAndEventListeners()
        this.fetchAndLoadStores()
    }

    storeBindingsAndEventListeners() {
        this.storesContainer = document.getElementById('stores-container')
        // this.cardClass = document.getElementsByClassName('card shadow2')
        this.body = document.querySelector('body')
        this.newStoreName = document.getElementById('new-store-name')
        this.storeForm = document.getElementById('new-store-form')
        this.storeForm.addEventListener('submit', this.createStore.bind(this))
        this.storesContainer.addEventListener('dblclick', this.handleStoreClick.bind(this))
        this.body.addEventListener('blur', this.updateStore.bind(this), true)
        console.log(this.name)
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
        e.preventDefault()
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
        this.adapter.updateStore(newValue, id)
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
        // why do i need to have the const storesContainer defined here?
        // and not use this.storesContainer defined in storeBindingsAndEventListeners()?
        const storesContainer = document.getElementById('stores-container')
        const newItemForm = document.getElementById('new-item-form')

        // const cardClass = document.getElementsByClassName('card shadow2')
        // storesContainer.container += " cardClass"
        // storesContainer.innerHTML = this.stores.map(store => store.renderStoreLi()).join('')

        this.stores.map(store => {
            let storeUl = document.createElement('ul')
            let storeLi = document.createElement('li')
            storeLi.innerHTML = `<li data-id=${store.id}>${store.name}</li>`
            storeUl.appendChild(storeLi)
            let ul = document.createElement('ul')
            for (let i of store.items) {
                // let li = renderItemLi()
                // how to call a function from another class?
                let li = document.createElement('li')
                li.setAttribute('data-id', i['id'])
                li.innerHTML = `${i['name']}, ${i['price']}, ${i['quantity']}`
                ul.appendChild(li)
            }
            storeUl.appendChild(ul)
            // storesContainer.container += " cardClass"
            storesContainer.appendChild(storeUl).classList.add('card').classList.add('column')

            // storeUl.appendChild(newItemForm).style.display = "block"
        })

        // create a <p></p> or <span></span> to be able to reference an individual store that I can
        // grab the element and place an eventListener on, to render a formHTML() which has the items form.
    }

}
