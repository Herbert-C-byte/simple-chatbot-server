import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json())

async function callAI(messages) {
  const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.KIMI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'moonshot-v1-8k',
      messages: [
        { role: 'system', content: 'You are a helpful customer support assistant. Be concise and friendly.' },
        ...messages
      ]
    })
  })

  const data = await response.json()
  return data.choices[0].message.content
}

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body

  try {
    const reply = await callAI(messages)
    res.json({ reply })
  } catch (error) {
    console.error('AI error:', error)
    res.status(500).json({ error: 'Service unavailable. Try again later.' })
  }
})

app.listen(3001, () => console.log('Server running on port 3001'))