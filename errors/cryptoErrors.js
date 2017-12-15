const emptyKey = new Error('Key buffer cannot be empty.')
const keysNoProvided = new Error('Please set your symmetric and hmac key.')
const wrongKeyLength = new Error('Key is shorter than the expected size')

export default {
  emptyKey,
  wrongKeyLength,
  keysNoProvided
}
