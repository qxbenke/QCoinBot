const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

// 👤 /start
bot.start((ctx) => {
  ctx.reply(
    `🚀 欢迎来到 QX (TON Meme Coin)

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
})

// 🎁 空投
bot.action('airdrop', (ctx) => {
  ctx.answerCbQuery()
  ctx.reply('🎁 你获得 +10 QX（模拟）')
})

// 👛 钱包
bot.action('wallet', (ctx) => {
  ctx.answerCbQuery()
  ctx.reply(`
👛 QX Wallet

Network: TON
Balance: 100 QX（模拟）
`)
})

// 📊 数据
bot.action('stats', (ctx) => {
  ctx.answerCbQuery()
  ctx.reply(`
📊 QX 项目数据

Status: LIVE
Chain: TON
Users: 1024（模拟）
`)
})

// 启动
bot.launch()

console.log('🚀 QX Bot Running...')
