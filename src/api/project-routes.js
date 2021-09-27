const express = require('express');
const router = express.Router();

const {Project} = require('../mongodb');

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

router.get('/projects', (req, res) => {
    Project.find(req.query, (err, docs) => {
        if(err) {
            res.status(500).send({ error: err });
        } else {
            if(docs) {
                const orderedProjects = docs.sort((doc1, doc2) => doc2._id > doc1._id).slice(0, req.query.limit || 10);
                res.send(orderedProjects);
            } else {
                res.status(404).end();
            }
        }
    })
});

router.get('/projects/search', (req, res) => {
    const searchObj = {
        ...req.query,
        q: undefined,
        $text: {$search: req.query.q || ''}
    };
    
    Project.find(searchObj, (err, docs) => {
        res.send(docs);
    });
});

router.get('/projects/:id', (req, res) => {
    Project.findOne({projectID: req.params.id}, (err, doc) => {
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
})

router.post('/projects', ensureAdmin, function(req, res) {
    const {
        name,
        description,
        src,
        download
    } = req.body;

    const newProject = new Project({
        name,
        description,
        src,
        download
    });

    newProject.save((err, obj) => {
        if(err) {
            console.log(err);
            res.status(400).send({ error: err });
        } else {
            res.redirect('/projects');
        }
    });
});

router.post('/projects/:id', ensureAdmin, function(req, res) {
    const {
        name,
        description,
        src,
        download
    } = req.body;

    const projectID = req.params.id;

    const updatedProject = {
        name,
        description,
        src,
        download
    };

    Blog.findOneAndUpdate({projectID}, updatedProject, () => {
        res.redirect('/projects');
    });
});

router.delete('/projects/:id', ensureAdmin, function(req, res) {
    const projectID = req.params.id;

    Blog.findOneAndDelete({projectID}, () => {
        res.redirect('/projects');
    });
});

module.exports = router;