/* eslint-disable no-console */
/* eslint-disable no-useless-constructor */
import sjcl from 'sjcl'
import Key from './Key'

const encoding = 'hex'

export default class AsymmetricKey extends Key {
  constructor (pair) {
    // check thay the key size is KEY_SIZE
    super()
    this._pair = pair
    this._pub = pair.pub.get()
    this._sec = pair.sec.get()
  }

  get pub () {
    return this._serialize(this._pub)
  }

  get sec () {
    return this._serialize(this._sec)
  }

  _serialize (key) {
    let serialized = ''

    if ('x' in key) {
      serialized = sjcl.codec[encoding].fromBits(key.x.concat(key.y))
    } else {
      serialized = sjcl.codec[encoding].fromBits(key)
    }

    return serialized
  }

  static generate (keySize) {
    return new AsymmetricKey(sjcl.ecc.elGamal.generateKeys(256))
  }
}
