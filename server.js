// imports

const express = require('express');
const helmet = require('helmet');
const userDb = require('./data/helpers/userDb.js');

const server = express();


// middleware

server.use(helmet());
server.use(express.json());


// routes

server.get('/users/', (req, res) => {
    userDb
        .get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({"error": 'No information could not be retrieved.'});
        });
})

server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    userDb
        .get(id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({"error": 'No user with the specified ID could be found.'})
            }
        })
        .catch(() => {
            res.status(500).json({"error": 'No information could not be retrieved.'});
        });
})

// exports

module.exports = server;