# Buy / Where

Buy / Where allows a user to track their spending by creating stores and items they purchase associated with those stores.

This app utilizes a Rails API back-end with a SQLite3 database, as well as a Javascript front-end.

The Back-End:
The following end-points are utilized in the API to fetch data:

'http://localhost:3000/api/v1/stores' - This is the index of all the stores and contains nested items for each store. This end-point has get, post and patch routes for creating and updating stores.

'http://localhost:3000/api/v1/items' - This end-point will get all items and has post and patch routes for creating and updating items.

The Front-End:
The front-end uses Javascript to asynchronously make get and post requests to the API to populate the page with data and update the API. The data and functionality of the front-end was encapsulated in classes and methods.

Getting Started
To get started using this app do the following:

Clone the repository

git clone https://github.com/jamesncox/buy-where.git
Navigate to the top of the 'buy-where-api' directory

cd buy-where-api
Install required gem dependencies

run rake db:seed
Start your rails server

rails s
Open index.html in your browser

Enjoy the app!

If you have any feedback for my application, don't hesitate to let me know. Thank you for checking it out!
