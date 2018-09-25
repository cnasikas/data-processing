/* eslint-disable no-console */
/* eslint-disable no-useless-constructor */

const sjcl = require('sjcl-all')
const Key = require('./Key')

const encoding = 'hex'
const KEY_SIZE = 256

module.exports = class AsymmetricKey extends Key {
  constructor (...args) {
    super()

    let pair = {}
    let pub = {}
    let sec = {}

    if (!sjcl.ecc) {
      throw new Error('You must install sjcl with ecc module')
    }

    if (args.length === 0 || args.length > 2) {
      throw new Error('You must provide a valid assymetric key pair')
    }

    if (args.length === 1) {
      let obj = args[0]

      if (!(obj instanceof Object &&
        obj.pub instanceof sjcl.ecc.elGamal.publicKey &&
        obj.sec instanceof sjcl.ecc.elGamal.secretKey)) {
        throw new Error('Argument must be an sjcl key pair object')
      }

      pair = obj
      pub = pair.pub
      sec = pair.sec
    }

    if (args.length === 2) {
      if (!(typeof args[0] === 'string' &&
        typeof args[1] === 'string' &&
        args[0] && args[0].charAt &&
        args[1] && args[1].charAt
      )) {
        throw new Error('Key pair must be a valid string')
      }

      if (args[0].length !== (KEY_SIZE / 2) || args[1].length !== (KEY_SIZE / 4)) {
        throw new Error('Key is shorter than the expected size')
      }

      pub = AsymmetricKey.deserialize(args[0], 'pub')
      sec = AsymmetricKey.deserialize(args[1], 'sec')
      pair = { pub, sec }
    }
    this._pair = pair
    this._pub = pub
    this._sec = sec
  }

  get pub () {
    return this._pub.serialize().point
  }

  get sec () {
    return this._sec.serialize().exponent
  }

  static deserialize (key, type = 'pub') {
    if (type === 'pub') {
      // eslint-disable-next-line
      return new sjcl.ecc.elGamal.publicKey(
        sjcl.ecc.curves.c256,
        sjcl.codec[encoding].toBits(key)
      )
    } else {
      // eslint-disable-next-line
      return new sjcl.ecc.elGamal.secretKey(
        sjcl.ecc.curves.c256,
        sjcl.ecc.curves.c256.field.fromBits(sjcl.codec[encoding].toBits(key))
      )
    }
  }

  static serialize (key) {
    let serialized = key.serialize()

    if (serialized.secretKey) {
      serialized = serialized.exponent // secret key
    } else {
      serialized = serialized.point // public key
    }

    return serialized
  }

  static generate () {
    return new AsymmetricKey(sjcl.ecc.elGamal.generateKeys(KEY_SIZE))
  }
}
