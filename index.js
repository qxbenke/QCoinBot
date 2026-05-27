require('dotenv').config()

const { Telegraf, Markup } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

const WEBSITE = 'https://q-coin-green.vercel.app/'

bot.start((ctx) => {
  javascript
bot.command('qx', (ctx) => {
  ctx.reply(`
🚀 Q Coin (QX)

AI + Web3 + 极速支付生态

💎 Token: QX
🌐 Network: TON Blockchain
📦 Supply: 560,000 QX
🔢 Decimals: 9

📜 Contract:
EQC-0juuPuAL3wt7jeXXnRQ9Fk_1Lge75bc12TcgImRTOkAE

🌍 Website:
https://q-coin-green.vercel.app/

💰 Buy QX:
https://app.ston.fi/

⚡ Status:
LIVE
`)
})
  ctx.reply(
    `🚀 Welcome to Q Coin (QX)

AI + Web3 + 极速支付生态系统

请选择功能：`,
    Markup.inlineKeyboard([
      [
        Markup.button.url('🌐 官网', WEBSITE),
        Markup.button.url('💰 Buy QX', WEBSITE)
      ],
      [
        Markup.button.callback('👛 钱包', 'wallet'),
        Markup.button.callback('🎁 空投', 'airdrop')
      ],
      [
        Markup.button.callback('🤖 AI助手', 'ai')
      ]
    ])
  )
})

bot.action('wallet', async (ctx) => {
  await ctx.answerCbQuery()

  ctx.reply(`
👛 Q Coin Wallet

TON Network
Token: QX

Contract:
EQC-0juuPuAL3wt7jeXXnRQ9Fk_1Lge75bc12TcgImRTOkAE
`)
})

bot.action('airdrop', async (ctx) => {
  await ctx.answerCbQuery()

  ctx.reply(`
🎁 QX Airdrop

完成以下步骤：

1. 关注官方频道
2. 分享 Q Coin
3. 邀请好友

奖励将在后续开放。
`)
})

bot.action('ai', async (ctx) => {
  await ctx.answerCbQuery()

  ctx.reply(`
🤖 Q Coin AI Assistant

未来功能：

• Web3 AI
• 钱包助手
• QX 查询
• TON生态工具
`)
})

bot.command('buy', (ctx) => {
  ctx.reply(
    '💰 Buy QX',
    Markup.inlineKeyboard([
      [Markup.button.url('立即购买', WEBSITE)]
    ])
  )
})

bot.command('website', (ctx) => {
  ctx.reply(WEBSITE)
})

bot.launch()

console.log('🚀 Q Coin Bot Running...')
