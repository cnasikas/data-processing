import express from 'express'

const createControllerRoutes = (controller) => {
  const router = express.Router()
  router.get('/', (req, res) => controller.list(req, res))
  router.get('/:id', (req, res) => controller.read(req, res, req.params.id))
  router.post('/', (req, res) => controller.create(req, res))
  router.put('/:id', (req, res) => controller.update(req, res, req.params.id))
  router.delete('/:id', (req, res) => controller.destroy(req, res, req.params.id))

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
