const trimNullBytes = (str) => {
  return str.replace(/\0/g, '')
}

const awaitEvent = (event, handler) => {
  return new Promise((resolve, reject) => {
    const wrappedHandler = (...args) => {
      Promise.resolve(handler(...args)).then(resolve).catch(reject)
    }

    event.watch(wrappedHandler)
  })
}

const registerEntity = async (dataStore, web3, entity, options = {}) => {
  entity.key = `${entity.key[0].toUpperCase()}${entity.key.slice(1)}`
  const functionKey = `register${entity.key}`
  const tx = await dataStore[functionKey](entity.account, web3.fromAscii(entity.name), entity.pubKey, { ...options })
  return tx
}

const registerDataset = async (dataStore, web3, dataset, account) => {
  const tx = await dataStore.registerDataSet(
    dataset.hash,
    web3.fromAscii(dataset.name),
    dataset.location, web3.fromAscii(dataset.category),
    JSON.stringify(dataset.metadata),
    { from: account }
  )
  return tx
}

const requestProcessing = async (dataStore, web3, dataset, request, account) => {
  const tx = await dataStore.requestProcessing(
    dataset.hash,
    web3.fromAscii(request.algorithm),
    request.pubKey,
    { from: account }
  )
  return tx
}

module.exports = {
  trimNullBytes,
  awaitEvent,
  registerEntity,
  registerDataset,
  requestProcessing
}
