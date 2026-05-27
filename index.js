const { Telegraf, Markup } = require('telegraf')
const axios = require('axios')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

// 后端 API 地址
const API = process.env.API_URL || 'http://localhost:3000'

// 🌐 /start 注册 + 主界面
bot.start(async (ctx) => {
  try {
    await axios.post(`${API}/register`, {
      id: ctx.from.id,
      username: ctx.from.username || '',
    })

    return ctx.reply(
      `🚀 欢迎来到 QX (TON Meme Coin)

👤 用户: ${ctx.from.first_name}

请选择功能：`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback('🎁 空投', 'airdrop'),
          Markup.button.callback('👛 钱包', 'wallet')
        ],
        [
          Markup.button.callback('📊 数据', 'stats')
        ]
      ])
    )
  } catch (err) {
    console.log(err)
    ctx.reply('❌ 系统错误，请稍后再试')
  }
})

/* =======================
   🎁 空投
======================= */
bot.action('airdrop', async (ctx) => {
  try {
    await ctx.answerCbQuery()

    const res = await axios.post(`${API}/airdrop`, {
      id: ctx.from.id
    })

    ctx.reply(`🎁 空投成功！

💰 你获得 +10 QX
📊 当前余额: ${res.data.balance}`)
  } catch (err) {
    ctx.reply('❌ 空投失败，请稍后再试')
  }
})

/* =======================
   👛 钱包（模拟版）
======================= */
bot.action('wallet', async (ctx) => {
  try {
    await ctx.answerCbQuery()

    const res = await axios.post(`${API}/register`, {
      id: ctx.from.id
    })

    ctx.reply(`👛 钱包信息

ID: ${ctx.from.id}
QX余额: ${res.data.balance}
网络: TON`)
  } catch (err) {
    ctx.reply('❌ 获取钱包失败')
  }
})

/* =======================
   📊 数据统计
======================= */
bot.action('stats', async (ctx) => {
  try {
    await ctx.answerCbQuery()

    const res = await axios.get(`${API}/stats`)

    ctx.reply(`📊 QX 项目数据

👥 用户数: ${res.data.users}
🚀 状态: LIVE
🌐 Network: TON`)
  } catch (err) {
    ctx.reply('❌ 获取数据失败')
  }
})

/* =======================
   /help
======================= */
bot.command('help', (ctx) => {
  ctx.reply(`
📌 QX Bot Commands:

/start - 启动
/help - 帮助
`)
})

/* =======================
   启动 Bot
======================= */
bot.launch()

console.log('🚀 QX Bot Running...')
