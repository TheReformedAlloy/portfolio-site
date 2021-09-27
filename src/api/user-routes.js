const express = require('express');
const router = express.Router();

const {User} = require('../mongodb');

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(400).end();
    }
}

router.get('/users', (req, res) => {
    User.find(req.query, (err, docs) => {
        if(err) {
            res.status(500).send({ error: err });
        } else {
            if(docs) {
                const orderedUsers = docs.sort((doc1, doc2) => doc2._id > doc1._id).slice(0, req.query.limit || 10);
                res.send(orderedUsers);
            } else {
                res.status(404).end();
            }
        }
    })
});

router.get('/users/search', (req, res) => {
    User.find({$text: {$search: req.query.q || ''}}, (err, docs) => {
        res.send(docs);
    });
});

router.get('/users/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if(err) {
            res.status(500).send({ error: err });
        } else {
            if(doc) {
                res.send(doc);
            } else {
                res.status(404).end();
            }
        }
    })
});

// router.post('/users/:id', ensureAuthenticated, function(req, res) {
//     User.findById(req.params.id, (err, doc) => {
//         if(err) {
//             res.status(500).send({ error: err });
//         } else {
//             if(doc) {
//                 if(doc._id == req.user._id) {
//                     const {
//                         content
//                     } = req.body;

//                     const updatedComment = {
//                         content
//                     }

//                     User.findOneAndUpdate(doc, updatedUser, (err, doc) => {
//                         res.status(200).end();
//                     })
//                 } else {
//                     res.status(400).end();
//                 }
//             } else {
//                 res.status(404).end();
//             }
//         }
//     })
    
// });

router.delete('/users/:id', ensureAuthenticated, function(req, res) {
    User.findById(req.params.id, (err, doc) => {
        if(err) {
            res.status(500).send({ error: err });
        } else {
            if(doc) {
                if(doc.userID == req.user._id) {
                    Blog.findOneAndDelete(doc, () => {
                        res.status(200).end();
                    });
                } else {
                    res.status(400).end();
                }
            } else {
                res.status(404).end();
            }
        }
    })
});

module.exports = router;