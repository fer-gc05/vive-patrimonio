import { schedule } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_KEY = process.env.SUPABASE_KEY || ''

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const handler = schedule('0 0 * * *', async () => {
  try {
    const { error } = await supabase
      .from('settings')
      .select('id')
      .limit(1)

    if (error) {
      console.error('Keep-alive ping failed:', error.message)
      return { statusCode: 500 }
    }

    console.log('Keep-alive ping OK:', new Date().toISOString())
    return { statusCode: 200 }
  } catch (err) {
    console.error('Keep-alive error:', err)
    return { statusCode: 500 }
  }
})

export { handler }
