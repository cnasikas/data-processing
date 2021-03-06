import types from './ActionTypes'
import blockchain from 'blockchain'
import notificationsActions from './notifications'

const addNotification = notificationsActions.addNotification

const getBalances = (accounts, node) => {
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
    try {
      const ledger = blockchain()
      const NodeClass = ledger.NodeClass
      const node = new NodeClass()

      dispatch({ type: types.GET_ACCOUNTS, payload: {} })

      let payload = { data: {} }
      const accounts = await node.getAccounts()
      payload.data.accounts = await getBalances(accounts, node)
      payload.data.default = { ...payload.data.accounts[0] }

      dispatch({ type: types.GET_ACCOUNTS_SUCCESS, payload })
    } catch (err) {
      dispatch(addNotification({ type: 'error', message: err.message, class: 'danger' }))
    }
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
