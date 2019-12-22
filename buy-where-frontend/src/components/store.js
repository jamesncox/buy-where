class Store {
    constructor(storeJSON) {
        this.id = storeJSON.id
        this.name = storeJSON.name
        this.items = storeJSON.items.map(io => new Item(io))
    }

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
                <button name="Add Item">Add Item</button>
            </ul>
        `)
    }

}