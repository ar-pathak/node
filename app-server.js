// app-server.js
import express from 'express'
import hogan from 'hogan-express'
import http_module from 'http'
import bodyParser from 'body-parser'
import compression from 'compression'
import _ from 'lodash'
import config from './config'
import Cosmic from 'cosmicjs'
import dotenv from 'dotenv'
dotenv.config();

console.log('🔍 DEBUGGING: Starting Cosmic CMS connection...')
console.log('📦 Bucket slug:', 'my-node-boilerplate-production')
console.log('🔑 Read key:', 'IFqbb0kE65H40qBgWxbhBDtDhHyNNcsKG1rydQyNiDpX3hxQg0')
console.log('✏️  Write key:', 'XgnTtSgf1P5B4VaKwf1MSDrDx3MSv7EjKQyYoAivZb5FXvD7wf')

const api = Cosmic()
console.log('🌍 Cosmic API initialized:', !!api)

const bucket = api.bucket({
  slug: 'my-node-boilerplate-production',
  read_key: 'IFqbb0kE65H40qBgWxbhBDtDhHyNNcsKG1rydQyNiDpX3hxQg0',
  write_key: 'XgnTtSgf1P5B4VaKwf1MSDrDx3MSv7EjKQyYoAivZb5FXvD7wf'
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