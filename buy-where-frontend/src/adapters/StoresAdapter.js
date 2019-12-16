class StoresAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/stores'
    }

    getStores() {
        return fetch(this.baseUrl).then(res => res.json())
    }

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