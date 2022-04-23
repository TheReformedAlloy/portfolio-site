const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { Exhibit } = require('../mongodb');

const { ensureAdmin } = require('../middleware/auth')
const { uploadFilesToBucket, deleteFilesFromBucket } = require('../middleware/aws');

router.get('/gallery', (req, res) => {
    let filter = {}
    let projection = '';
    let options = {}
    if(req.query){
        projection = req.query.projection;
        options = {
            limit: req.query.limit,
            skip: req.query.skip,
            lean: req.query
        }
        filter = {
            ...req.query,
            projection: undefined,
            limit: undefined,
            skip: undefined,
            lean: undefined
        }
    }

    Exhibit.find(filter, projection, options, (err, docs) => {
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

router.post('/gallery', ensureAdmin, upload.array('files'), uploadFilesToBucket, function(req, res) {
    const exhibitObj = {
        ...req.body,
        files: req.files.map(file => {
            return {
                contentType: file.mimetype,
                imgDesc: '',
                imgType: file.originalname.split(".")[1],
                fileName: file.originalname.split(".")[0]
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

router.post('/gallery/:id', ensureAdmin, upload.array('files'), uploadFilesToBucket, function(req, res) {
    const exhibitID = req.params.id;

    const exhibitObj = {
        ...req.body,
        files: req.files.map(file => {
            return {
                contentType: file.mimetype,
                imgDesc: '',
                imgType: file.originalname.split(".")[1],
                fileName: file.originalname.split(".")[0]
            }
        })
    }
    
    Exhibit.findOneAndUpdate({exhibitID}, exhibitObj)
        .then((res2) => {
            res.redirect(`/gallery/${exhibitID}`);
        }).catch(err => {
            res.status(400).send({ error: err });
        })
});

router.delete('/gallery/:id', ensureAdmin, function(req, res) {
    const exhibitID = req.params.id;

    Gallery.findOneAndDelete({exhibitID}, () => {
        res.redirect('/gallery');
    });
});

module.exports = router;