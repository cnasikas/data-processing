import { Router } from 'express'

export default class BaseController {
  constructor (model, key) {
    this.model = model
    this.modelName = model.modelName.toLowerCase()
    this.key = key
  }

  /**
   * Display a listing of the resource.
   */
  list (req, res) {
  }

  /**
   * Store a newly created resource in storage.
   */
  create (req, res) {
  }

  /**
   * Get the specified resource.
   *
   */
  read (req, res, id) {
  }

  /**
   * Update the specified resource in storage.
   *
   */
  update (req, res, id) {
  }

  /**
  * Remove the specified resource from storage.
  */
  destroy (req, res, id) {
  }

  router () {
    const router = new Router()

    router.get('/', (req, res) => {
      this.list(req, res)
    })

    router.get('/:key', (req, res) => {
      this.read(req, res, req.params.key)
    })

    router.post('/', (req, res) => {
      this.create(req, res)
    })

    router.put('/:key', (req, res) => {
      this.update(req, res, req.params.key)
    })

    router.delete('/:key', (req, res) => {
      this.destroy(req, res, req.params.key)
    })

    return router
  }
}
