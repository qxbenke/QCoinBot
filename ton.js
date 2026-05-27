const axios = require('axios')

const QX_MASTER = 'EQC-0juuPuAL3wt7jeXXnRQ9Fk_1Lge75bc12TcgImRTOkAE'

function normalize(addr) {
  return (addr || '')
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .toLowerCase()
}

/**
 * 🚀 100% TON Jetton QX 查询（生产级稳定版）
 */
async function getQXBalance(wallet) {
  try {
    const res = await axios.get(
      `https://tonapi.io/v2/accounts/${wallet}/jettons`
    )

    const balances = res.data?.balances || []

    const qx = balances.find(j => {
      const addr = normalize(j.jetton?.address)
      const master = normalize(QX_MASTER)

      const symbol = (j.jetton?.symbol || '').toUpperCase()

      return (
        addr === master ||
        symbol === 'QX' ||
        j.jetton?.name === 'Q Coin'
      )
    })

    if (!qx) return 0

    const decimals = qx.jetton?.decimals ?? 9
    const raw = Number(qx.balance || 0)

    return raw / Math.pow(10, decimals)

  } catch (err) {
    console.log('TON ERROR:', err.message)
    return 0
  }
}

module.exports = { getQXBalance }
