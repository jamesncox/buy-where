// class ItemsAdapter {
//     constructor() {
//         this.baseUrl = 'http://localhost:3000/api/v1/items'
//     }

//     getItems() {
//         return fetch(this.baseUrl).then(res => res.json())
//     }

//     createItem(value) {
//         const item = {
//             name: value,
//         }

//         return fetch(this.baseUrl, {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json',
//             },
//             body: JSON.stringify({ item }),
//         }).then(res => res.json())
//     }

//     updateItem(value, id) {
//         const item = {
//             name: value,
//         }

//         return fetch(`${this.baseUrl}/${id}`, {
//             method: 'PATCH',
//             headers: {
//                 'content-type': 'application/json',
//                 'accepts': 'application/json',
//             },
//             body: JSON.stringify({ item }),
//         }).then(res => res.json())
//     }
// }