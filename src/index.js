import express from 'express'
import http from 'http'
import fs from 'fs'
import jwt from 'jsonwebtoken'

let app = express()
http.createServer(app)
app.jwt = jwt
app.middlewares = require('./middlewares')(app,fs)

const routes = require('./routes')(app)

app.listen(3000)
console.log('Application started.');
