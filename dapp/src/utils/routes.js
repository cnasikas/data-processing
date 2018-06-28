const createAppRoutes = (routes) => {
  const defaults = {}

  return routes.map((item) => {
    return {...defaults, ...item}
  })
}

export {
  createAppRoutes
}
