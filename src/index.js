import express from 'express'
import http from 'http'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'

let app = express()
http.createServer(app)
app.models = require('./models')(app);
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.jwt = jwt
app.middlewares = require('./middlewares')(app,fs)
app.controllers = require('./controllers')(app,fs)

const routes = require('./routes')(app)

app.listen(3000)
console.log('Application started.');
