class Items {

    //create and initiliaze objects and methods related to Items class.
    constructor() {
        this.items = []
        this.adapter = new ItemsAdapter()
        this.itemBindingsAndEventListeners()
    }

}