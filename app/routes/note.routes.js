module.exports = (app) => {
/* const express = require('express');
const bodyParser = require('body-parser');
const app = express(); */
    const products = require('../controllers/note.controller.js');

    // Create a new product
    app.post('/products', products.create);

    // Retrieve all products
    app.get('/products', products.findAll);

    // Retrieve a single product with ProductId
    app.get('/products/:productId', products.findOne);

    // Update a product with ProductId
    app.put('/products/:productId', products.update);

    // Delete a product with ProductId
    app.delete('/products/:productId', products.delete);
}
