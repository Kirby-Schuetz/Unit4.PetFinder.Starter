// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
    res.sendFile(__dirname + "/public/index.html");
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
    // url has to be as follows in the browser:
    // http://localhost:8080/api/
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array from the database as a response
    res.send(pets);
    // url has to be as follows in the browser:
    // http://localhost:8080/api/v1/pets
});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
    const { owner } = req.query;

    // find the pet in the pets array
    const pet = pets.filter(pet => pet.owner === owner);

    // send the pet as a response
    res.send(pet);
        // url has to be as follows in the browser:
    // http://localhost:8080/api/v1/pets/owner?owner=John
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const { name } = req.params;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name.toLowerCase() === name.toLowerCase());

    // send the pet as a response
    res.send(pet);
    // url has to be as follows in the browser:
    // http://localhost:8080/api/v1/pets/Fido
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;