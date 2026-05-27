async function getQXBalance(wallet) {
  const res = await axios.get(
    `https://tonapi.io/v2/accounts/${wallet}/jettons`
  )

  const balances = res.data.balances || []

  const qx = balances.find(j =>
    (j.jetton.symbol || '').toUpperCase() === 'QX'
  )

  if (!qx) return 0

  const decimals = qx.jetton.decimals || 9
  return Number(qx.balance) / Math.pow(10, decimals)
}
