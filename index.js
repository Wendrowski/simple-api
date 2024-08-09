"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 3000;
app.use(express.json()); // Middleware to parse JSON bodies
// Simulated in-memory database
var items = [];
// Create a new item
app.post('/items', function (req, res) {
    var item = req.body;
    items.push(item);
    res.status(201).send(item);
});
// Read all items
app.get('/items', function (req, res) {
    res.send(items);
});
// Read a single item by ID
app.get('/items/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);
    var item = items.find(function (i) { return i.id === id; });
    if (item) {
        res.send(item);
    }
    else {
        res.status(404).send({ message: 'Item not found' });
    }
});
// Update an item by ID
app.put('/items/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);
    var index = items.findIndex(function (i) { return i.id === id; });
    if (index !== -1) {
        items[index] = req.body;
        res.send(items[index]);
    }
    else {
        res.status(404).send({ message: 'Item not found' });
    }
});
// Delete an item by ID
app.delete('/items/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);
    var index = items.findIndex(function (i) { return i.id === id; });
    if (index !== -1) {
        var deletedItem = items.splice(index, 1);
        res.send(deletedItem);
    }
    else {
        res.status(404).send({ message: 'Item not found' });
    }
});
// Initial route
app.get('/', function (req, res) {
    res.send('Hello, World!');
});
// Server listening
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
