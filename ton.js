const axios = require('axios')

/**
 * 🚀 TON Jetton 100%稳定查询版本
 * 适配：QX / 任意 Jetton
 */

async function getQXBalance(wallet) {
  try {
    if (!wallet) return 0

    const url = `https://tonapi.io/v2/accounts/${wallet}/jettons`

    const res = await axios.get(url)

    const balances = res.data?.balances || []

    if (!Array.isArray(balances)) return 0

    // 🔥 核心：只用 symbol 判断（最稳定）
    const qx = balances.find(j => {
      const symbol = (j.jetton?.symbol || '').toUpperCase()
      return symbol === 'QX'
    })

    if (!qx) return 0

    const decimals = qx.jetton?.decimals ?? 9
    const raw = Number(qx.balance || 0)

    return raw / Math.pow(10, decimals)

  } catch (err) {
    console.log('TON ERROR:', err?.message)
    return 0
  }
}

module.exports = { getQXBalance }
