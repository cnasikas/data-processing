import sjcl from '../lib/sjcl.js'
import low from 'lowdb'
import _ from 'lodash'

const DEFAULT_CURVE = 192

class ECC {
  constructor () {
    this.keys = {}
    this.hexKeys = {}
    this.pubKem = {}
    this.db = null
  }

  _isDB () {
    return this.db !== null
  }
  _getPubKey () {
    return this.keys.pub.get()
  }

  _getSecKey () {
    return this.keys.sec.get()
  }

  _keysToHex () {
    this.hexKeys = {
      pub: sjcl.codec.hex.fromBits(this._getPubKey().x) + sjcl.codec.hex.fromBits(this._getPubKey().y),
      sec: sjcl.codec.hex.fromBits(this._getSecKey())
    }
  }

  _setKem () {
    this.pubKem = this.keys.pub.kem()
  }

  _loadPubKey (pubHex) {
    // eslint-disable-next-line new-cap
    this.keys.pub = new sjcl.ecc.elGamal.publicKey(sjcl.ecc.curves['c192'], sjcl.codec.hex.toBits(pubHex))
  }

  _loadSecKey (secHex) {
    // eslint-disable-next-line new-cap
    this.keys.sec = new sjcl.ecc.elGamal.secretKey(sjcl.ecc.curves['c192'], new sjcl.bn(secHex))
  }

  _dbHasKeys () {
    if (!this._isDB()) {
      return false
    }

    const cryptoKeys = this.db.get('keys').value()

    if (!cryptoKeys) {
      return false
    }

    return !(_.isEmpty(cryptoKeys.pub) || _.isEmpty(cryptoKeys.sec))
  }

  setDB () {
    this.db = low('./db/keys.js')
  }

  generateKeys () {
    this.keys = sjcl.ecc.elGamal.generateKeys(DEFAULT_CURVE)
    this._setKem()
    this._keysToHex()
    return this
  }

  getKeys () {
    return this.hexKeys
  }

  encrypt (plaintext = '') {
    return sjcl.encrypt(this.pubKem.key, plaintext)
  }

  decrypt (ciphertext = {}) {
    return sjcl.decrypt(this.keys.sec.unkem(this.pubKem.tag), ciphertext)
  }

  importKeys (hexKeys) {
    this._loadPubKey(hexKeys.pub)
    this._loadSecKey(hexKeys.sec)
    this._setKem()
    this._keysToHex()
    return this
  }

  loadKeys () {
    if (this._dbHasKeys()) {
      this.importKeys(this.db.get('keys').value())
    } else {
      this.generateKeys()
      this.saveKeys()
    }

    return this
  }

  saveKeys () {
    if (this._isDB() && !this._dbHasKeys()) {
      let timestamp = Date.now()
      let cryptoKeys = this.getKeys()
      this.db
          .get('keys')
          .set('pub', cryptoKeys.pub)
          .set('sec', cryptoKeys.sec)
          .set('created_at', timestamp)
          .set('update_at', timestamp)
          .write()
    } else {
      throw Error('Something wrong with db')
    }
  }
}

export default new ECC()
