const emptyKey = new Error('Key buffer cannot be empty.')
const keysNoEnvSet = new Error('Please set your symmetric and hmac key.')
const keysNoProvided = new Error('Symmetric and HMAC key should be provided.')
const wrongKeyLength = new Error('Key is shorter than the expected size')
const diffKeys = new Error('key and hmac Key MUST be different!')

export default {
  emptyKey,
  wrongKeyLength,
  keysNoProvided,
  keysNoEnvSet,
  diffKeys
}
