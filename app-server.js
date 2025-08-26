// app-server.js
import express from 'express'
import hogan from 'hogan-express'
import http_module from 'http'
import bodyParser from 'body-parser'
import compression from 'compression'
import _ from 'lodash'
import config from './config'
import { createBucketClient } from '@cosmicjs/sdk'
import dotenv from 'dotenv'
dotenv.config();

console.log('🔍 DEBUGGING: Starting Cosmic CMS connection...')
console.log('📦 Bucket slug:', process.env.COSMIC_BUCKET)
console.log('🔑 Read key:', process.env.COSMIC_READ_KEY)
console.log('✏️  Write key:', process.env.COSMIC_WRITE_KEY)

const bucket = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET,
  readKey: process.env.COSMIC_READ_KEY,
  writeKey: process.env.COSMIC_WRITE_KEY
})
console.log('🪣 Bucket initialized:', !!bucket)
const app = express()

app.use(bodyParser.json())
app.use(compression())
app.engine('html', hogan)
app.set('views', __dirname + '/views')
app.set('port', process.env.PORT || 3000)
app.use(express.static(__dirname + '/public'))
app.use((req, res, next) => {
  if (req.url === '/favicon.ico')
    return res.end()
  // Set global variables
  res.locals.year = new Date().getFullYear()
  // Set dev
  if (process.env.NODE_ENV === 'development')
    res.locals.is_dev = true
  next()
})
const partials = {
  header: 'partials/header',
  footer: 'partials/footer'
}
require('./routes')(app, config, bucket, partials, _)
const http = http_module.Server(app)
http.listen(app.get('port'), () => {
  console.info('==> 🌎  Go to http://localhost:%s', app.get('port'));
})