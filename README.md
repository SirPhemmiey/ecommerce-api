# Ecommerce API

It allows users to search, add items to their shopping cart, create orders, and checkout successfully.


## 📖 Getting started

1. Clone this repository into your local machine:
```
git clone https://github.com/SirPhemmiey/ecommerce-api.git
```
2. Install dependencies
```
yarn
```

3. Go to `config/index.js` to add your database details in `dbConfig` object.

## Running the Application
- To run the application, run `yarn start`

 4. To test the endpoints, get api docs here: https://documenter.getpostman.com/view/3683187/S17jXCh5

## Features
Below are the features of ecommerce API.

Users can view all items when entering the website<br />
Items are displayed properly based on the selected department and category<br />
Users can search items through search box <br/>
Support paging if we have too many items<br/>
Users can see item details by selecting a specific item<br />
Users can add items to their shopping carts<br/>
Users can register/login using website custom forms<br />
Users can update personal profiles with shipping addresses and other info<br />
Users can checkout with Stripe payment gateway <br />
Admins can add/remove/edit a department <br />
Admins can add/remove/edit a category <br />
Admins can add/remove/edit a product <br />
Admins can add/remove/edit attributes for a product <br />

## Technologies used

Modern JavaScript technologies were adopted for this project

ES2015: Also known as ES6 or ES2015 or ECMASCRIPT 6, is a new and widely used version of Javascript
that makes it compete healthily with other languages.

NodeJS: Node.js is an open-source, cross-platform JavaScript run-time for writing javascript server side applications.

ExressJS: This is the web application framework for Node.js

MySQL: This is an open source relational database management system.

New Relic: This is an APM (Application Performance Monitor) which helps to gets real-time insights that a software needs to perform faster and scale. 

Winston: A logger for just about everything.

Helmet: It helps to secure Express apps with various HTTP headers.

Rate limit: Used to limit repeated requests to public APIs and/or endpoints such as password reset.


## Testing
- To run server side test, run `yarn test`
