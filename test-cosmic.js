// Test Cosmic CMS connection
const { createBucketClient } = require('@cosmicjs/sdk')
require('dotenv').config()

console.log('🧪 TESTING COSMIC CMS CONNECTION...')
console.log('================================')
console.log('📦 Bucket slug:', process.env.COSMIC_BUCKET)
console.log('🔑 Read key:', process.env.COSMIC_READ_KEY)
console.log('✏️  Write key:', process.env.COSMIC_WRITE_KEY)

const bucket = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET,
  readKey: process.env.COSMIC_READ_KEY,
  writeKey: process.env.COSMIC_WRITE_KEY
})
console.log('✅ Bucket object created')

// Test the connection
async function testConnection() {
  try {
    console.log('🔄 Testing bucket.objects.find()...')
    const response = await bucket.objects.find()
    
    console.log('🎉 SUCCESS! Connection working!')
    console.log('📊 Response structure:')
    console.log('- Response keys:', Object.keys(response))
    
    if (response.objects) {
      console.log('- Objects count:', response.objects.length)
      console.log('- First few objects:')
      response.objects.slice(0, 3).forEach((obj, i) => {
        console.log(`  ${i + 1}. ${obj.title} (${obj.slug}) - Type: ${obj.type}`)
      })
    } else {
      console.log('- No objects property in response')
    }
    
  } catch (error) {
    console.log('❌ CONNECTION FAILED!')
    console.log('Error details:')
    console.log('- Message:', error.message)
    console.log('- Status:', error.status)
    console.log('- Full error:', error)
    
    // Additional debugging
    if (error.response) {
      console.log('- Response status:', error.response.status)
      console.log('- Response data:', error.response.data)
    }
  }
}

testConnection()