import sjcl from '../lib/sjcl.js'
import _ from 'lodash'

const DEFAULT_CURVE = 192

class ECC {
  constructor () {
    this.keys = {}
    this.hexKeys = {}
    this.pubKem = {}
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

  _hasKeys () {

    return !(_.isEmpty(process.env.PUB_KEY) || _.isEmpty(process.env.SEC_KEY))
  }

  _generateKeys () {
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
    if (this._hasKeys()) {
      this.importKeys({pub: process.env.PUB_KEY, sec: process.env.SEC_KEY})
    } else {
      this._generateKeys()
      let errorMsg = `Missing crypto keys: \n I generate those keys for you: {pub: ${this.getKeys().pub}, sec: ${this.getKeys().sec}}`
      throw new Error(errorMsg)
    }

    return this
  }
}

export default new ECC()
