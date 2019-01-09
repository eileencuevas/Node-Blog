// imports

const express = require('express');
const helmet = require('helmet');
const userDb = require('./data/helpers/userDb.js');

const server = express();

// middleware

server.use(helmet());
server.use(express.json());

// const uppercaser = (req, res, next) => {
//     const name = req.body.name;
//     if (name) {
//         req.uppercased = { name: name.toUpperCase() };
//         next();
//     }
// }

// server.use(uppercaser);


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

server.post('/users/', (req, res) => {
    const newUserData = req.body;

    if (newUserData) {
        userDb
            .insert(newUserData)
            .then(newUserId => {
                res.status(201).json({ ...newUserData, ...newUserId });
            })
            .catch(() => {
                res.status(500).json({ "error": 'There was an error with adding this user. Please try again.' });
            });
    } else {
        res.status(400).json({ "error": 'Please provide a name for this user. '});
    }
})

server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    userDb
        .get(id)
        .then(user => {
            if (user) {
                userDb
                    .update(id, newData)
                    .then(() => {
                        res.status(200).json({ id, ...newData });
                    })
                    .catch(() => {
                        res.status(500).json({ "error": ' There was an error with updating this user. Please try again.' })
                    });
            } else {
                res.status(404).json({ "error": 'No user with the specified ID could be found.' })
            }
        })
        .catch(() => {
            res.status(500).json({"error": 'No information could not be retrieved.'});
        });
})

// exports

module.exports = server;