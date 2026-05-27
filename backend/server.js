const express = require('express')
const app = express()

app.use(express.json())

const users = {}

app.post('/register', (req, res) => {
  const { id } = req.body

  if (!users[id]) {
    users[id] = { balance: 0 }
  }

  res.json(users[id])
})

app.post('/airdrop', (req, res) => {
  const { id } = req.body

  if (!users[id]) return res.status(404).send('no user')

  users[id].balance += 10

  res.json({ balance: users[id].balance })
})

app.get('/stats', (req, res) => {
  res.json({
    users: Object.keys(users).length
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('API running on', PORT)
})
