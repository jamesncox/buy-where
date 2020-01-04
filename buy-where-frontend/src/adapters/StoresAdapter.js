class StoresAdapter {

    //create and initialize a url to fetch stores instances.
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/stores'
    }

    //fetch stores using "get" (and items) from the database.
    getStores() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    //send new stores to the database.
    createStore(value) {
        const store = {
            name: value,
        }

        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ store }),
        }).then(res => res.json())
    }

    //modify a store and send it to the database.
    updateStore(value, id) {
        const store = {
            name: value,
        }

        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'accepts': 'application/json',
            },
            body: JSON.stringify({ store }),
        }).then(res => res.json())
    }
}