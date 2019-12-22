class Item {
    constructor(itemJSON) {
        this.id = itemJSON.id
        this.name = itemJSON.name
        this.price = itemJSON.price
        this.quantity = itemJSON.quantity
    }



    get tableHTML() {
        return (`
            <tr>
                <td class="item-name" data-id="${this.id}" data-type="name"> ${this.name} </td>
                <td data-id="${this.id}" data-type="price"> ${this.price} </td>
                <td data-id="${this.id}" data-type="quantity"> ${this.quantity} </td>
            </tr>
        `)
    }
}