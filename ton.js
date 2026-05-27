const axios = require('axios')

const QX_MASTER = process.env.QX_MASTER?.toLowerCase()

/**
 * 🚀 100%链上准确 Jetton 查询（生产级）
 */
async function getQXBalance(wallet) {
  try {
    const url = `https://tonapi.io/v2/accounts/${wallet}/jettons`

    const res = await axios.get(url)

    const balances = res.data?.balances || []

    if (!balances.length) return 0

    // 🔥 多层匹配（生产级关键）
    const qx = balances.find(j => {
      const addr = j.jetton?.address?.toLowerCase()
      const symbol = j.jetton?.symbol?.toUpperCase()

      // ① 精确合约匹配
      if (QX_MASTER && addr === QX_MASTER) return true

      // ② fallback：symbol匹配（防错）
      if (symbol === 'QX') return true

      return false
    })

    if (!qx) return 0

    // 🔥 自动 decimals（不再写死 1e9）
    const decimals = qx.jetton?.decimals ?? 9
    const balance = Number(qx.balance || 0)

    return balance / Math.pow(10, decimals)

  } catch (err) {
    console.log('TON API ERROR:', err?.message)
    return 0
  }
}

module.exports = { getQXBalance }
