class Store {
    constructor(storeJSON) {
        this.id = storeJSON.id
        this.name = storeJSON.name
        this.items = storeJSON.items.map(io => new Item(io))
    }

    html(items) {
        return (`
            <ul class='card highlight'>
                <li data-id=${this.id}>
                    ${this.name}
                </li>
                <table>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                    ${items}
                </table>
            </ul>
        `)
    }

}