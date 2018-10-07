const importEntries = async (node, entries, options = {}) => {
  for (let entry of entries) {
    const tx = await node[options.contractFunc](...Object.values(entry))
    console.log(`Tx: ${tx}`)
  }
}

module.exports = {
  importEntries
}
