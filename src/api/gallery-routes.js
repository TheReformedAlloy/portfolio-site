const express = require('express');
const router = express.Router();

const {Exhibit} = require('../mongodb');

const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'tmp/uploads/')
    }
});

const upload = multer({ storage });

function ensureAdmin(req, res, next) {
    if(req.isAuthenticated()) {
        if(req.user.admin == true) {
            next();
        } else {
            return res.redirect("/login");
        }
    } else {
        return res.redirect("/login");
    }
}

router.get('/gallery', (req, res) => {
    Exhibit.find(req.query, (err, docs) => {
        if(err) {
            res.status(500).send({ error: err });
        } else {
            if(docs) {
                const orderedPosts = docs.sort((doc1, doc2) => doc2._id > doc1._id).slice(0, req.query.limit || 10);
                res.send(orderedPosts);
            } else {
                res.status(404).end();
            }
        }
    })
});

router.get('/galleryIDs', (req, res) => {
    Exhibit.find(req.query, 'galleryID', (err, docs) => {
        if(err) {
            res.status(500).send({ error: err });
        } else {
            if(docs) {
                const orderedPosts = docs.sort((doc1, doc2) => doc2._id > doc1._id).slice(0, req.query.limit || 10);
                res.send(orderedPosts);
            } else {
                res.status(404).end();
            }
        }
    })
});

router.get('/gallery/search', (req, res) => {
    const searchObj = {
        ...req.query,
        q: undefined,
        $text: {$search: req.query.q || ''}
    };
    
    Exhibit.find(searchObj, (err, docs) => {
        res.send(docs);
    });
});

router.get('/gallery/:id', (req, res) => {
    Exhibit.findOne({galleryID: req.params.id}, (err, doc) => {
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

router.post('/gallery', ensureAdmin, upload.array('imgs'), function(req, res) {
    const exhibitObj = {
        ...req.body,
        imgs: req.files.map(file => {
            return {
                data: fs.readFileSync(file.path),
                contentType: file.mimetype,
                imgDesc: ''
            }
        })
    }

    const newExhibit = new Exhibit(exhibitObj);

    newExhibit.save((err, obj) => {
        if(err) {
            console.log(err);
            res.status(400).send({ error: err });
        } else {
            res.redirect('/gallery');
        }
    });
});

router.post('/gallery/:id', ensureAdmin, async function(req, res) {
    const blogID = req.params.id;

    const update = await Blog.findOneAndUpdate({blogID}, req.body);
    res.redirect(`/gallery/${blogID}`);
});

router.delete('/gallery/:id', ensureAdmin, function(req, res) {
    const galleryId = req.params.id;

    Blog.findOneAndDelete({galleryId}, () => {
        res.redirect('/gallery');
    });
});

module.exports = router;