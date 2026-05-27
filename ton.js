const axios = require('axios')

const QX_MASTER = process.env.QX_MASTER

// 💰 查 QX余额（Jetton）
async function getQXBalance(wallet) {
  try {
    const url = `https://tonapi.io/v2/accounts/${wallet}/jettons`

    const res = await axios.get(url)

    const jettons = res.data.balances || []

    const qx = jettons.find(
      j => j.jetton.address === QX_MASTER
    )

    return qx ? Number(qx.balance) / 1e9 : 0
  } catch (e) {
    console.log('TON API error', e.message)
    return 0
  }
}

module.exports = { getQXBalance }
