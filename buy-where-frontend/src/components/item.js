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
                <td class="item-price" data-id="${this.id}" data-type="price"> ${this.price} </td>
                <td class="item-quantity" data-id="${this.id}" data-type="quantity"> ${this.quantity} </td>
            </tr>
        `)
    }

    addItemForm() {
        return (`
            <form id="new-item-form">
                <label>What did you buy?</label>
                <input type="text" id="new-item-name" placeholder="Item name">
                <input type="submit" id="item-btn" value="Submit">
                <br>
                <label>How much did it cost?</label>
                <input type="text" id="new-item-price" placeholder="Item cost" />
                <input type="submit" id="price-btn" value="Submit" />
                <br>
                <label>How many did you purchase?</label>
                <input type="text" id="new-item-quantity" placeholder="Item quantity" />
                <input type="submit" id="quantity-btn" value="Submit" />
            </form>
        `)
    }

}





// function openAddItemForm() {
//     document.getElementById("new-item-form").style.display = "block";
//   }

//   function closeAddItemForm() {
//     document.getElementById("new-item-form").style.display = "none";
//   }