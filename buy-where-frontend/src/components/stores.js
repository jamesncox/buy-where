class Stores {
    constructor() {
        this.stores = []
        this.adapter = new StoresAdapter()
        this.storeBindingsAndEventListeners()
        this.fetchAndLoadStores()
    }

    storeBindingsAndEventListeners() {
        this.storesContainer = document.getElementById('stores-container')
        this.body = document.querySelector('body')
        this.newStoreName = document.getElementById('new-store-name')
        this.storeForm = document.getElementById('new-store-form')
        this.storeForm.addEventListener('submit', this.createStore.bind(this))
        this.storesContainer.addEventListener('dblclick', this.handleStoreClick.bind(this))
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
        // const newItemForm = document.getElementById('new-item-form')
        // const newPriceForm = document.getElementById('new-price-form')
        // const newQuantityForm = document.getElementById('new-quantity-form')

        // const itemTable = document.getElementById('item-table')

        // storesContainer.innerHTML = this.stores.map(store => store.renderStoreLi()).join('')

        const storeHTML = this.stores.map(store => {
            const itemHTML = store.items.map(i => i.tableHTML).join('')

            return store.html(itemHTML)
        }).join('')

        storesContainer.innerHTML = storeHTML
    }
}

// this.stores.map(store => {
//     let storeUl = document.createElement('ul')
//     let storeLi = document.createElement('li')

//     storeLi.innerHTML = `<li data-id=${store.id}>${store.name}</li>`
//     storeUl.appendChild(storeLi).classList.add('highlight')
//     let ul = document.createElement('ul')

//     for (let i of store.items) {
//         // let tdItem = document.createElement('td')
//         // let tdPrice = document.createElement('td')
//         // let tdQuantity = document.createElement('td')
//         // let itemRow = document.createElement('tr')

//         for (let tI = 0; tI < i.length; tI++) {
//             itemTable += "<tr>"
//             html += "<td>" + i[tI].name + "</td>";
//             html += "<td>" + i[tI].price + "</td>";
//             html += "<td>" + i[tI].quantity + "</td>";

//             html += "</tr>";
//         }

//         // tdItem.innerHTML = `${i['name']}`
//         // tdPrice.innerHTML = `${i['price']}`
//         // tdQuantity.innerHTML = `${i['quantity']}`

//         // itemTable.tBodies[1].appendChild[itemRow]

//         ul.appendChild(itemTable).classList.add
//     }
//     storeUl.appendChild(ul)
//     storesContainer.appendChild(storeUl).classList.add('card')
// })