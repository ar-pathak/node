// Direct API test for Cosmic CMS
import axios from 'axios'

console.log('🌐 TESTING COSMIC API DIRECTLY...')
console.log('================================')

const bucketSlug = 'my-node-boilerplate-production'
const readKey = 'IFqbb0kE65H40qBgWxbhBDtDhHyNNcsKG1rydQyNiDpX3hxQg0'

// Test different API endpoints
async function testDirectAPI() {
  const tests = [
    {
      name: 'Test 1: Basic bucket info (v1 API)',
      url: `https://api.cosmicjs.com/v1/${bucketSlug}`,
      headers: { 'Authorization': `Bearer ${readKey}` }
    },
    {
      name: 'Test 2: Get objects (v1 API)',
      url: `https://api.cosmicjs.com/v1/${bucketSlug}/objects`,
      headers: { 'Authorization': `Bearer ${readKey}` }
    },
    {
      name: 'Test 3: Basic bucket info (v2 API)',
      url: `https://api.cosmicjs.com/v2/buckets/${bucketSlug}`,
      headers: { 'Authorization': `Bearer ${readKey}` }
    },
    {
      name: 'Test 4: Get objects (v2 API)',
      url: `https://api.cosmicjs.com/v2/buckets/${bucketSlug}/objects`,
      headers: { 'Authorization': `Bearer ${readKey}` }
    }
  ]

  for (const test of tests) {
    console.log(`\n🧪 ${test.name}`)
    console.log(`📡 URL: ${test.url}`)
    
    try {
      const response = await axios.get(test.url, { headers: test.headers })
      console.log(`✅ SUCCESS! Status: ${response.status}`)
      console.log(`📊 Response keys:`, Object.keys(response.data))
      
      if (response.data.objects) {
        console.log(`📦 Objects found: ${response.data.objects.length}`)
      } else if (response.data.bucket) {
        console.log(`🪣 Bucket info: ${response.data.bucket.title || 'No title'}`)
      }
      
    } catch (error) {
      console.log(`❌ FAILED! Status: ${error.response?.status || 'No status'}`)
      console.log(`💬 Message: ${error.response?.data?.message || error.message}`)
      
      if (error.response?.data) {
        console.log(`📄 Full response:`, error.response.data)
      }
    }
  }
}

testDirectAPI()