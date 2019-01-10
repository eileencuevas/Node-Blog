const express = require('express');
const postDb = require('../../data/helpers/postDb');

const router = express.Router();

router.get('/', (req, res) => {
    postDb
        .get()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(() => {
            res.status(500).json({ "error": 'No information could be retrieved. '})
        });
})

router.get('/:id', (req, res) => {
    const id = req.params.id;

    postDb
        .get(id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ "error": 'No post with the specified ID found.' })
            }
        })
        .catch(() => {
            res.status(500).json({ "error": 'No information could be retrieved. '})
        });
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const newPostData = req.body;
    
    postDb
        .get(id)
        .then(post => {
            if (post) {
                postDb
                    .update(id, newPostData)
                    .then(() => {
                        res.status(200).json({ ...newPostData });
                    })
                    .catch(() => {
                        res.status(500).json({ "error": 'This post could not be updated. Please try again.' })
                    });
            } else {
                res.status(404).json({ "error": 'No post with the specified ID found.' })
            }
        })
        .catch(() => {
            res.status(500).json({ "error": 'No information could be retrieved. '})
        });
})

module.exports = router;