import express from 'express'
import http from 'http'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import passport from 'passport'
import morgan from 'morgan'

let LocalStrategy = require('passport-local').Strategy;

let app = express()
http.createServer(app)
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // parse application/json
app.jwt = jwt
app.models = require('./models')(app);

// passport strategy
app.use(passport.initialize())
passport.use('local',new LocalStrategy({
        usernameField:"email",
        passwordField:"password"
    },
    function(email, password, done){
        console.log('email '+email);
        app.models.User.findOne({
            where: {
                email: email
            }
        }).then((user) => {
            if(!user){
                return done(null, false, { message: 'Incorrect username.' })
            } else {
                done(null,user)
            }
        })
    }
))

passport.serializeUser(function(user, done) {
  done(null, "shafdahgsdhsagdh");
});

passport.deserializeUser(function(id, done) {
  done(null,{ username: "heru"})
});
app.middlewares = require('./middlewares')(app,fs)
app.controllers = require('./controllers')(app,fs)

const routes = require('./routes')(app,passport)

app.listen(3000)
console.log('Application started.');
