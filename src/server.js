require("dotenv").config();
const express = require("express");
const next = require("next");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const cors = require('cors');
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

const passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const {User} = require('./mongodb');
const MongoStore = require('connect-mongo');

const uid = require("uid-safe");

const { ensureAdmin, ensureAuth } = require('./middleware/auth');

const authRoutes = require("./api/auth-routes");
const blogRoutes = require('./api/blog-routes');
const projectRoutes = require('./api/project-routes');
const commentRoutes = require('./api/comment-routes');
const userRoutes = require('./api/user-routes');
const galleryRoutes = require('./api/gallery-routes');

const fs = require('fs');
const https = require('https');

const dev = process.env.NODE_ENV !== "production";

const app = next({
  dev,
  dir: "./src"
});
const handle = app.getRequestHandler();

// var cert = fs.readFileSync('./ssl/reformedalloy_com.crt');
// var ca = fs.readFileSync('./ssl/reformedalloy_com.ca-bundle');
// var key = fs.readFileSync('./ssl/privkey.key');


app.prepare().then(() => {
    const server = express();
    if(dev) {
        process.env.hostURL = `http://localhost:${process.env.PORT}`
        process.env.mongoConnectString = `mongodb://127.0.0.1:${process.env.MONGO_PORT}/info`
    } else {
        process.env.hostURL = 'https://www.reformedalloy.com';
        process.env.mongoConnectString = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_URL}/info?retryWrites=true&w=majority`
    }

    mongoose.connect(process.env.mongoConnectString).catch(err => {
        console.error('App starting error:', err.stack);
        process.exit(1);
    }).then(() => {
        const sessionConfig = {
            secret: uid.sync(18),
            resave: false,
            saveUninitialized: false,
            store: new MongoStore({ client: mongoose.connection.getClient()})
        };
        
        server.use(session(sessionConfig));
    
        server.use(express.json());
        server.use(express.urlencoded({ extended: false }));
        server.use(cookieParser());
    
        server.use(cors(corsOptions));
        
        passport.use(new LocalStrategy(User.authenticate()));
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());
    
        server.use(passport.initialize());
        server.use(passport.session());
        server.use(authRoutes);
        server.use('/api', blogRoutes);
        server.use('/api', projectRoutes);
        server.use('/api', commentRoutes);
        server.use('/api', userRoutes);
        server.use('/api', galleryRoutes);
        server.use('/admin', ensureAdmin);
    
        // handling everything else with Next.js
        server.get("*", handle);
        
        server.listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT}`);
        });
    });
});