class ItemsAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/stores'
    }

    getItems() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    // createStore(value) {
    //     const store = {
    //         body: value,
    //     }

    //     return fetch(this.baseUrl, {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json',
    //         },
    //         body: JSON.stringify({ store }),
    //     }).then(res => res.json())
    // }

    // updateStore(value, id) {
    //     const store = {
    //         body: value,
    //     }

    //     return fetch(`${this.baseUrl}/${id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'content-type': 'application/json',
    //         },
    //         body: JSON.stringify({ store }),
    //     }).then(res => res.json())
    // }
}