class Item {
    constructor(itemJSON) {
        // console.log(itemJSON)
        this.id = itemJSON.id
        this.name = itemJSON.name
        this.price = itemJSON.price
        this.quantity = itemJSON.quantity
    }

    renderItemLi() {
        let li = document.createElement('li')
        li.setAttribute('data-id', i['id'])
        li.innerHTML = `${i['name']}, ${i['price']}, ${i['quantity']}`
        return li
    }
}