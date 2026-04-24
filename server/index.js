import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json())

// API — activar quando a chave estiver funcional
// async function callAI(messages) {
//   const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${process.env.KIMI_API_KEY}`
//     },
//     body: JSON.stringify({
//       model: 'kimi-k2.5',
//       messages: [
//         { role: 'system', content: 'You are a helpful customer support assistant for a carpentry business. Be concise and friendly. Always respond in Portuguese.' },
//         ...messages
//       ]
//     })
//   })
//   const data = await response.json()
//   return data.choices[0].message.content
// }

async function callAI(messages) {
  const last = messages[messages.length - 1].content.toLowerCase()

  if (last.includes('olá') || last.includes('ola') || last.includes('bom dia') || last.includes('boa tarde') || last.includes('boa noite') || last.includes('hello') || last.includes('hi')) {
    return 'Olá! Bem-vindo à nossa carpintaria. Estou aqui para o ajudar com informações, orçamentos e agendamentos. Como posso ajudar?'
  }
  if (last.includes('preço') || last.includes('orçamento') || last.includes('custo') || last.includes('quanto custa') || last.includes('valor')) {
    return 'Obrigado pelo interesse! Para elaborar um orçamento precisamos de alguns detalhes: tipo de trabalho, dimensões e prazo pretendido. Pode partilhar essas informações?'
  }
  if (last.includes('horário') || last.includes('hora') || last.includes('aberto') || last.includes('funcionamento') || last.includes('trabalham')) {
    return 'Estamos disponíveis de segunda a sexta das 8h às 18h e aos sábados das 8h às 13h. Ao domingo estamos encerrados.'
  }
  if (last.includes('contacto') || last.includes('telefone') || last.includes('ligar') || last.includes('número') || last.includes('whatsapp')) {
    return 'Pode deixar o seu número aqui e entraremos em contacto brevemente, ou ligar directamente durante o horário de funcionamento.'
  }
  if (last.includes('móvel') || last.includes('cadeira') || last.includes('mesa') || last.includes('armário') || last.includes('porta') || last.includes('janela') || last.includes('cozinha') || last.includes('quarto')) {
    return 'Trabalhamos com todo o tipo de mobiliário em madeira — mesas, cadeiras, armários, portas e muito mais. Qual é o produto que tem em mente?'
  }
  if (last.includes('prazo') || last.includes('demora') || last.includes('quando') || last.includes('entrega') || last.includes('tempo')) {
    return 'O prazo depende do tipo e dimensão do trabalho. Trabalhos simples levam 1 a 2 semanas, trabalhos mais complexos entre 3 a 6 semanas. Com mais detalhes consigo dar uma estimativa mais precisa.'
  }
  if (last.includes('material') || last.includes('madeira') || last.includes('tipo de madeira')) {
    return 'Trabalhamos com diversas madeiras — mogno, teca, pinho, eucalipto e outras. A escolha depende do uso, estética e orçamento. Quer saber mais sobre alguma em específico?'
  }
  if (last.includes('nome') || last.includes('chamo') || last.includes('sou o') || last.includes('sou a')) {
    return 'Obrigado por se identificar! Ficou registado. Em que posso ajudá-lo hoje?'
  }
  if (last.includes('obrigado') || last.includes('obrigada') || last.includes('valeu') || last.includes('agradeço')) {
    return 'De nada! Estamos sempre à disposição. Se precisar de mais alguma coisa não hesite em perguntar.'
  }

  return 'Obrigado pela sua mensagem. Para melhor o ajudar, pode dar-me mais detalhes sobre o que precisa? Estou aqui para responder a questões sobre produtos, preços, prazos e agendamentos.'
}

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body

  try {
    const reply = await callAI(messages)
    res.json({ reply })
  } catch (error) {
    console.error('AI error:', error)
    res.status(500).json({ error: 'Serviço temporariamente indisponível. Tente novamente.' })
  }
})

app.listen(3001, () => console.log('Server running on port 3001'))