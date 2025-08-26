// home.js
module.exports = (app, config, bucket, partials, _) => {
  app.get('/', async (req, res) => {
    try {
      console.log('🏠 HOME ROUTE: Starting to fetch objects from Cosmic...')
      console.log('🪣 Bucket object:', bucket)
      
      const response = await bucket.objects.find()
      console.log('✅ SUCCESS: Got response from Cosmic')
      console.log('📊 Response keys:', Object.keys(response))
      console.log('📦 Objects count:', response.objects ? response.objects.length : 'No objects property')
      
      const objects = response.objects
      console.log('📋 All objects:', objects.map(obj => ({ slug: obj.slug, title: obj.title })))
      res.locals.globals = require('../helpers/globals')(objects, _)
      console.log('🌐 Globals:', res.locals.globals)
      const page = _.find(objects, { 'slug': 'home' })
      console.log('🏠 Home page found:', !!page)
      console.log('🏠 Home page data:', page)
      
      res.locals.page = page
      const carousel_items = page.metadata && page.metadata.carousel ? page.metadata.carousel : []
      if (carousel_items && Array.isArray(carousel_items)) {
        carousel_items.forEach((item, i) => {
          if (i === 0)
            item.is_first = true
          item.index = i
        })
      }
      return res.render('index.html', {
        partials
      })
    } catch (error) {
      console.log('❌ ERROR in home route:')
      console.log('Error message:', error.message)
      console.log('Error status:', error.status)
      console.log('Full error:', error)
      return res.status(500).send({ "status": "error", "message": "Yikes, something went wrong!", "debug": error.message })
    }
  })
}
