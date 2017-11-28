import crypto from 'crypto' // Node.js Crypto library
import _ from 'lodash'
import Key from './Key.js'

const INPUT_ENCODING = 'utf8'
const OUTPUT_ENCODING = 'hex'

const ALGORITHM = 'aes-256-ctr'
const MAC_FUNCTION = 'sha512'

const processorPK = "-----BEGIN PRIVATE KEY-----
  MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDYIOGIP8JkocOO
  fXEek/ibv3KoXgk7sjtZdkAHHret1BpwkY7rDjTD54onZWyPgaT0M/G20Q55+ED2
  mLkk0z/Y5zrnQYAVhPXplTlZz/UTlhwv827zLAVBoE20ed3x4NtQOEOUJRHsj4kM
  CZz54XwvTLfMD5nKvLryZ60k6yDlqYo6SNKYPUKh65ULfJVxLqI2zgDfxN9Fe0Kq
  BafoiEuF/sfambeZt5Oqe26Iy33ecpT34JvcrkQrNQSSOQ4ixGQRRdJqa73IdMVu
  U1QeeXIBZrcVltlsz6CgrjkByjM/V90jx74iG0hnVOMm+X8wQbyvgdh1DkhrBTE0
  eUBxGLopAgMBAAECggEBAL4xyWdGfMJkHJzjRU3cd9ZP1w3Vmxh+k3358wSRAqEl
  W5MedP/jg4m207wxpCRxuYDxyU/Rj4TEdB7ObXe7s58kdZCW8ql9VY8WM98Wg5yV
  5/5Goqe6YHHNKTSeXjOCZl2k9cuEB87+zWLbftnjlY5mXARm4jcoePfjRtqLVGrl
  dkYNHd1zKwRX9PneZseRGIsmWTWlSUqldlDEGXXJPe3OHFozI11Ks92SC+mivQSl
  9FWKYETxa6eYvQBC0MxwfUCgclXP8mk/2Sk/THoCPf9uDWDqwP1ArF2xlQ8inVPk
  XJe4V2W3wnyKJYLfj+nIZwB0BTZzm1ee7qgJC94z4OUCgYEA+PMpPK745/9kEQkk
  sexkAp4yauMdlJNMa+7jF3PRLe3Eog6JZfpJHJKOraJbJCsYC1brOpJfMUQ2I+Sa
  xr3Y/hQ65EcVmGOhbOI2F6GzRuvwV0W872/hvQ1hgY1GwU2/5dyW/p0NVsg7NrBT
  qmePMGMZvv6bMx4f5BH97YADNhMCgYEA3j/FXfGtrR+lfnhkW+QIBm3cxvglWHu5
  ZGrF1hseeq0setWqy83FwP5/6Vo+qMtQhO9JhewkBgVTBrAUBK6cjG/eDc7PrzNX
  KMNUwPnUhyDunSSpxD2BtlMOj5mosG0+I8yQXBlMCHrmHvr/7UV66a/6ZmTqwTJy
  sJUG2rBHRlMCf27b2YEsaarmD6mGaNDSc7a2u7zdZk7DSUTHHFlVOdE6EFYaIxVG
  X0hZ+y9XHT798bca/aUXiUxnE7ToGARohjieyZreDL/PnhLeqTfcyfjLGDvE0l3N
  dLi7PLB0OQ3bkZjKonK/fTEn+TZhTuCTPTBO8SgcOQCKaakmWe1pFAUCgYEAiLPi
  +3jnYgCAM/1rhZYKVaIH1Z7WoclgbGK8k4iUw9J29IsuhjNouuAP34Hx3rNIMKxa
  pfRs6AMoYYm2lnastjks9YNK/bHvn5QeMqC41/EqtB/UCG/otDP8VdmnB/X57d0q
  wmuQ9/pYR6AOAWzmQI1M0OSr/O/B2dmgoK0i+h8CgYAZ56zPLm5KSq3foH9kxGBf
  bFBBinUCTNbOaonXetYqbeBdl5fcqd+aAgG+CEXlte0KkdhrtExXPSr/SM3Mu7/5
  fR03fJOELuY/LDQNGKYeea7tgkfe127+hakLNK9v7xqxY2p68ElGFH4OaEcZYbIw
  NfGa4hQWTxDDlkN5td66pw==
  -----END PRIVATE KEY-----"

export default class Crypto {
  constructor (symKey, hmacKey) {
    this.symKey = symKey
    this.hmacKey = hmacKey

    if (_.isEmpty(this.symKey) || _.isEmpty(this.hmacKey)) {
      throw new Error('Symmetric and HMAC key should be provided.')

    }

    if (this.symKey === this.hmacKey){
        throw new Error('key and hmac Key MUST be different!')
    }

  }

  _genKey (keySize) {
    /* Returns a promise */
    return Key.generate(keySize)
  }

  encrypt () {

    return new Promise((resolve, reject) => {

      this._genKey(16).then( (iv) => {



      })
    })
  }

  decrypt () {

  }

  encryptKeys () {

    return new Promise((resolve, reject) => {

      

    })
  }
}
