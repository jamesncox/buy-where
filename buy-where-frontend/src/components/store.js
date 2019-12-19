class Store {
    constructor(storeJSON) {
        this.id = storeJSON.id
        this.name = storeJSON.name
        // this.items = storeJSON.items.map(io => new Item(io))
    }

    storesHTML() {
        return (`
            <ul class='card'>
                <li class='highlight store-name' data-id=${this.id}>
                    ${this.name}
                </li>
                <div id="items-container">

                </div>
            </ul>
        `)
    }


    // html() {
    //     return (`
    //         <ul class='card'>
    //             <li class='highlight store-name' data-id=${this.id}>
    //                 ${this.name}
    //             </li>
    //             <table>
    //                 <tr>
    //                     <th>Item</th>
    //                     <th>Price</th>
    //                     <th>Quantity</th>
    //                 </tr>
    //                 ${items}
    //             </table>
    //         </ul>
    //     `)
    // }


}