class ItemsAdapter {

    //create and initialize a url to fetch items instances.
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/items'
    }

    getItems() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    //send a new item and its properties to the database.
    createItem(itemName, itemPrice, itemQuantity) {

        const item = {
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity
        }

        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ item }),
        }).then(res => res.json())
    }

    //modify an item and its properties and send them to the database.
    updateItem(itemName, itemPrice, itemQuantity, id) {

        const item = {
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity
        }

        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'accepts': 'application/json',
            },
            body: JSON.stringify({ item }),
        }).then(res => res.json())
    }
}