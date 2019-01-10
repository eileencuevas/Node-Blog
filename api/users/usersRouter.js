const express = require('express');
const userDb = require('../../data/helpers/userDb');
const uppercaser = require('../config/middlewares/uppercaser');

const router = express.Router();

router.get('/', (req, res) => {
    userDb
        .get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({"error": 'No information could be retrieved.'});
        });
})

router.get('/:id', (req, res) => {
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

router.get('/:id/posts/', (req, res) => {
    const id = req.params.id;

    userDb
        .get(id)
        .then(user => {
            if (user) {
                userDb
                    .getUserPosts(id)
                    .then(posts => {
                        res.status(200).json(posts);
                    })
                    .catch(() => {
                        res.status(500).json({ "error": 'Could not get post information. Please try again.' })
                    });
            } else {
                res.status(404).json({"error": 'No user with the specified ID could be found.'})
            }
        })
        .catch(() => {
            res.status(500).json({"error": 'No information could not be retrieved.'});
        });
})

router.post('/', uppercaser, (req, res) => {
    const newUserData = req.uppercased;

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

router.put('/:id', uppercaser, (req, res) => {
    const id = req.params.id;
    const newData = req.uppercased;

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

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    userDb
        .get(id)
        .then(user => {
            if (user) {
                userDb
                    .remove(id)
                    .then(() => {
                        res.status(200).json(user);
                    })
                    .catch(() => {
                        res.status(500).json({ "error": "There was an error with deleting this user. Please try again." })
                    });
            } else {
                res.status(404).json({"error": 'No user with the specified ID could be found.'})
            }
        })
        .catch(() => {
            res.status(500).json({"error": 'No information could not be retrieved.'});
        });
})

module.exports = router;