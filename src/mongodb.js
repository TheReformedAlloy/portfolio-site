const mongoose = require('mongoose');
const passportLocalMongoose = require('./lib/passport-local-mongoose');

const Counter = mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
try {
    mongoose.model('Counter', Counter);
} catch(e) {
    console.log("Counter already defined. Skipping.")
}

const counter = mongoose.model('Counter');

const User = mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    oauth: {
        groupme: {
            token: String
        }
    }
});
User.plugin(passportLocalMongoose);
User.index({'name.firstName': 'text', 'name.lastName': 'text', 'username': 'text'});

const Blog = mongoose.Schema({
    blogID: String,
    title: String,
    content: String,
    keywords: [String]
}, {
    timestamps: true
});

Blog.index({'$**': 'text'});

Blog.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'blogID'}, {$inc: { seq: 1} }, {new: true, upsert: true}, function(error, count)   {
        if(error)
            return next(error);
        doc.blogID = count.seq;
        next();
    });
});

const Project = mongoose.Schema({
    projectID: String,
    name: String,
    description: String,
    src: String,
    download: String,
    keywords: [String]
});

Project.index({'$**': 'text'});

Project.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'projectID'}, {$inc: { seq: 1} }, {new: true, upsert: true}, function(error, count)   {
        if(error)
            return next(error);
        doc.projectID = count.seq;
        next();
    });
});

const Comment = mongoose.Schema({
    commentID: String,
    postID: String,
    authorID: String,
    authorName: String,
    text: String
}, {
    timestamps: true
});

Comment.index({'$**': 'text'});

Comment.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'commentID'}, {$inc: { seq: 1} }, {new: true, upsert: true}, function(error, count)   {
        if(error)
            return next(error);
        doc.commentID = count.seq;
        next();
    });
});

const Exhibit = mongoose.Schema({
    galleryID: String,
    title: String,
    imgs: [{
        data: 'Buffer',
        contentType: String,
        imgDesc: String
    }],
    description: String
}, {
    timestamps: true
});

Exhibit.index({'$**': 'text'});

Exhibit.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'galleryID'}, {$inc: { seq: 1} }, {new: true, upsert: true}, function(error, count)   {
        if(error)
            return next(error);
        doc.galleryID = count.seq;
        next();
    });
});

try {
    mongoose.model('User', User);
    mongoose.model('Blog', Blog);
    mongoose.model('Project', Project);
    mongoose.model('Comment', Comment);
    mongoose.model('Exhibit', Exhibit);
} catch(e) {
    console.log('Models already defined. Skipping.');
}

module.exports = {
    User: mongoose.model('User'),
    Blog: mongoose.model('Blog'),
    Project: mongoose.model('Project'),
    Exhibit: mongoose.model('Exhibit'),
    Comment: mongoose.model('Comment')
};