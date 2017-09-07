import low from 'lowdb'
import _ from 'lodash'
import ecc from './ECC.js'

function db () {
  /* Write returns a promise. Fix it. */
  /* Start server listen afterd db init and hanlde errors */

  let contracts = low('./db/contracts.js')
  let cryptoKeys = low('./db/keys.js')

  if (_.isEmpty(contracts.getState())) {
    contracts.defaults({ contracts: {datastore: [], requests: []}, user: {} }).write()
  }

  if (_.isEmpty(cryptoKeys.getState())) {
    cryptoKeys.defaults({ keys: {pub: {}, sec: {}, created_at: 0, update_at: 0} }).write()
  }
}

function loadKeys () {
  ecc.setDB()
  ecc.loadKeys()
}

export default () => {
  db()
  loadKeys()
}
