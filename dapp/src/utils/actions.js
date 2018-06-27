const buildActionTypes = (types) => {
  return types.reduce((obj, item) => {
    obj[item] = item
    return obj
  }, {})
}

export {
  buildActionTypes
}
