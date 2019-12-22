class Items {
    constructor() {
        this.items = []
        this.adapter = new ItemsAdapter()
        this.itemBindingsAndEventListeners()
        // this.fetchAndLoadItems()
    }

    itemBindingsAndEventListeners() {
        this.itemsContainer = document.getElementById('items-container')
        // this.addItemButton = document.getElementById('add-item-button')

        this.body = document.querySelector('body')

        this.newItemName = document.getElementById('new-item-name')
        this.newItemPrice = document.getElementById('new-item-price')
        this.newItemQuantity = document.getElementById('new-item-quantity')
        this.storesContainer = document.querySelector('#stores-container')
        this.itemForm = document.getElementById('new-item-form')

        this.itemForm.addEventListener('submit', this.createItem.bind(this))
        this.storesContainer.addEventListener('dblclick', this.handleItemClick.bind(this))
        this.storesContainer.addEventListener('blur', this.updateItem.bind(this), true)

        // this.addItemButton.addEventListener('click', this.addItemButton())
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
        })
    }

    handleItemClick(e) {
        this.toggleItem(e)
    }

    toggleItem(e) {
        e.preventDefault()
        const td = e.target
        td.contentEditable = true
        td.focus()
        td.classList.add('editable')
    }


    updateItem(e) {
        const td = e.target
        console.log(e.target)
        td.contentEditable = false
        td.classList.remove('editable')
        const newNameValue = td.innerHTML
        const newPriceValue = td.innerHTML
        const newQuantityValue = td.innerHTML
        const id = e.target.dataset.id

        this.adapter.updateItem(newNameValue, newPriceValue, newQuantityValue, id)
    }

    addItemButton() {
        console.log('clicked...')
    }


    // fetchAndLoadItems() {
    //     this.adapter
    //         .getItems()
    //         .then(items => {
    //             items.forEach(item => this.items.push(new Item(item)))
    //         })
    //         .then(() => {
    //             this.renderItem()
    //         })
    // }

    // renderItem() {
    //     const itemHTML = this.items.map(item => {

    //         return item.tableHTML

    //     }).join('')
    //     // console.log(itemHTML)
    //     this.itemsContainer.innerHTML = itemHTML
    // }

}