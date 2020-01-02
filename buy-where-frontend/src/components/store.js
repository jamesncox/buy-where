class Store {

    //create and initialize a Store object and its properties.
    constructor(storeJSON) {
        this.id = storeJSON.id
        this.name = storeJSON.name
        this.items = storeJSON.items.map(io => new Item(io))
    }

    //create the html for displaying stores and items in a card class and dynamically create table for items.
    html(items) {
        return (`
            <ul class='card'>
                <li class='highlight store-name' data-id=${this.id}>
                    ${this.name}
                </li>
                <table>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                    <div class="items-container">
                        ${items}
                    </div>
                    
                </table>

                <button id="add-item-button">Add Item</button>

                <form class='item-card' id="new-item-form">
                <label>Item name: </label>
                <input type="text" id="new-item-name" placeholder="Item name">
                <br>
                <label>Item cost: </label>
                <input type="text" id="new-item-price" placeholder="Item cost" />
                <br>
                <label>Item quantity: </label>
                <input type="text" id="new-item-quantity" placeholder="Item quantity" />
                <br>
                <input type="submit" id="item-submit" value="Submit" />
            </form>
            </ul>
        `)
    }

}