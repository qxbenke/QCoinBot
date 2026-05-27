const { Telegraf } = require('telegraf')
const dotenv = require('dotenv')
const { getQXBalance } = require('./ton')

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

// 👛 临时钱包存储（生产用数据库）
const walletMap = {}

/* =========================
   🔗 绑定钱包
========================= */
bot.command('bind', (ctx) => {
  const wallet = ctx.message.text.split(' ')[1]

  if (!wallet) {
    return ctx.reply('❌ 用法: /bind EQCxxxx')
  }

  walletMap[ctx.from.id] = wallet

  ctx.reply(`👛 钱包绑定成功：

${wallet}`)
})

/* =========================
   💰 查询 QX 余额（链上）
========================= */
bot.command('balance', async (ctx) => {
  const wallet = walletMap[ctx.from.id]

  if (!wallet) {
    return ctx.reply('❌ 请先绑定钱包: /bind')
  }

  const balance = await getQXBalance(wallet)

  ctx.reply(`💰 QX Balance:

${balance} QX`)
})

/* =========================
   📊 资产总览
========================= */
bot.command('portfolio', async (ctx) => {
  const wallet = walletMap[ctx.from.id]

  if (!wallet) {
    return ctx.reply('❌ 请先绑定钱包')
  }

  const qx = await getQXBalance(wallet)

  ctx.reply(`
📊 Portfolio

👛 Wallet:
${wallet}

💰 QX:
${qx}

🌐 Network:
TON
`)
})

/* =========================
   🚀 启动
========================= */
bot.launch()

console.log('🚀 QX Web3 Bot Running...')
