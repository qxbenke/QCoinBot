const { Telegraf } = require('telegraf')
const axios = require('axios')

const bot = new Telegraf(process.env.BOT_TOKEN)

const API = process.env.API_URL

bot.start(async (ctx) => {
  await axios.post(`${API}/register`, {
    id: ctx.from.id
  })

  ctx.reply('🚀 QX Bot Started')
})

bot.command('airdrop', async (ctx) => {
  const res = await axios.post(`${API}/airdrop`, {
    id: ctx.from.id
  })

  ctx.reply(`🎁 +10 QX\nBalance: ${res.data.balance}`)
})

bot.command('stats', async (ctx) => {
  const res = await axios.get(`${API}/stats`)
  ctx.reply(`👥 Users: ${res.data.users}`)
})

bot.launch()
