import express from 'express'
import http from 'http'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import multipart from 'connect-multiparty'
import passport from 'passport'
import morgan from 'morgan'
import bcrypt from 'bcrypt'
import expressJoi from 'express-joi'

let path      = require("path");
let LocalStrategy = require('passport-local').Strategy;

let app = express()
http.createServer(app)
app.Joi = expressJoi.Joi;
app.Validator = expressJoi.joiValidate;
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) // parse application/json
app.use(multipart());
app.jwt = jwt
app.bcrypt = bcrypt;
app.models = require('./models')(app);

// passport strategy
app.use(passport.initialize())
passport.use('local',new LocalStrategy({
        usernameField:"email",
        passwordField:"password"
    },
    function(email, password, done){
        app.models.User.findOne({
            where: {
                email: email
            }
        }).then((user) => {
            if(!user){
                return done(null, false, { message: 'Incorrect username.' })
            } else {
                let compare = app.bcrypt.compareSync(password,user.password);
                if(compare){
                    done(null,user)
                } else {
                    return done(null, false, { message: 'Incorrect password.' })
                }

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
app.rules = require('./rules')(app,fs)
const routes = require('./routes')(app,passport)

app.listen(3000)
console.log('Application started.');
