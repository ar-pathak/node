// Test Cosmic CMS connection
import Cosmic from 'cosmicjs'

console.log('🧪 TESTING COSMIC CMS CONNECTION...')
console.log('================================')

const api = Cosmic()
console.log('✅ Cosmic API imported successfully')

const bucket = api.bucket({
  slug: 'my-node-boilerplate-production',
  read_key: 'IFqbb0kE65H40qBgWxbhBDtDhHyNNcsKG1rydQyNiDpX3hxQg0',
  write_key: 'XgnTtSgf1P5B4VaKwf1MSDrDx3MSv7EjKQyYoAivZb5FXvD7wf'
})
console.log('✅ Bucket object created')

// Test the connection
async function testConnection() {
  try {
    console.log('🔄 Testing bucket.getObjects()...')
    const response = await bucket.getObjects()
    
    console.log('🎉 SUCCESS! Connection working!')
    console.log('📊 Response structure:')
    console.log('- Response keys:', Object.keys(response))
    
    if (response.objects) {
      console.log('- Objects count:', response.objects.length)
      console.log('- First few objects:')
      response.objects.slice(0, 3).forEach((obj, i) => {
        console.log(`  ${i + 1}. ${obj.title} (${obj.slug}) - Type: ${obj.type_slug}`)
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