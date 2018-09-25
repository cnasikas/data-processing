import types from './ActionTypes'
import blockchain from 'blockchain'

const ledger = blockchain()
const NodeClass = ledger.NodeClass
const node = new NodeClass()

const getBalances = (accounts) => {
  const promises = accounts.map(async (account) => {
    return {
      address: account,
      balance: await node.getBalance(account)
    }
  })

  return Promise.all(promises)
}

const getAccounts = () => {
  return async dispatch => {
    dispatch({ type: types.GET_ACCOUNTS, payload: {} })

    let payload = { data: {} }
    const accounts = await node.getAccounts()
    payload.data.accounts = await getBalances(accounts)
    payload.data.default = { ...payload.data.accounts[0] }

    dispatch({ type: types.GET_ACCOUNTS_SUCCESS, payload })
  }
}

const actions = {
  getAccounts
}

// const actions = buildActions({
//   getAccounts: [types.GET_ACCOUNTS, 'accounts'],
//   getAccount: [types.GET_ACCOUNT, 'accounts/:id'],
//   setDefaultAccount: [types.SET_DEFAULT_ACCOUNT, 'accounts', 'post']
// })

export default actions
