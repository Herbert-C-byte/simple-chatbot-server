import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json())

// async function callAI(messages) {
//   const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${process.env.KIMI_API_KEY}`
//     },
//     body: JSON.stringify({
//       model: 'moonshot-v1-8k',
//       messages: [
//         { role: 'system', content: 'You are a helpful customer support assistant. Be concise and friendly.' },
//         ...messages
//       ]
//     })
//   })

async function callAI(messages) {
  const lastMessage = messages[messages.length - 1].content.toLowerCase()
  
  if (lastMessage.includes('preço') || lastMessage.includes('orçamento') || lastMessage.includes('custo')) {
    return 'Obrigado pelo interesse! Para elaborar um orçamento precisamos de alguns detalhes. Pode partilhar connosco o tipo de trabalho, as dimensões e o prazo pretendido?'
  }
  if (lastMessage.includes('horário') || lastMessage.includes('hora') || lastMessage.includes('aberto')) {
    return 'Estamos disponíveis de segunda a sexta das 8h às 18h e aos sábados das 8h às 13h.'
  }
  if (lastMessage.includes('contacto') || lastMessage.includes('telefone') || lastMessage.includes('ligar')) {
    return 'Pode contactar-nos pelo telefone ou deixar o seu número aqui que entramos em contacto brevemente.'
  }
  
  return 'Olá! Bem-vindo à nossa carpintaria. Estou aqui para o ajudar. Pode dizer-me como o posso ajudar hoje?'
}

  const data = await response.json()
  console.log(JSON.stringify(data, null, 2))
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