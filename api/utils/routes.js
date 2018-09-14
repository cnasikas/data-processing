import express from 'express'

const createControllerRoutes = (controller) => {
  const router = express.Router()
  router.get('/', (req, res, next) => controller.list(req, res).catch(next))
  router.get('/:id', (req, res, next) => controller.read(req, res, req.params.id).catch(next))
  router.post('/', (req, res, next) => controller.create(req, res).catch(next))
  router.put('/:id', (req, res, next) => controller.update(req, res, req.params.id).catch(next))
  router.delete('/:id', (req, res, next) => controller.destroy(req, res, req.params.id).catch(next))

  return router
}

const createSimpleRouter = (key) => {
  const Controller = require(`../controllers/${key}`)
  const controller = new Controller.default() // eslint-disable-line new-cap
  return {router: createControllerRoutes(controller), controller}
}

module.exports = {
  createSimpleRouter,
  createControllerRoutes
}
