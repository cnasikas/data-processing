export default class BaseController {
  constructor (model, key, singular) {
    this.model = model
    this.key = key
    this.singular = singular
  }

  /**
   * Display a listing of the resource.
   */
  async list (req, res) {
    try {
      const data = await this.model.findAll()
      res.json(data)
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }

  /**
   * Store a newly created resource in storage.
   */
  create (req, res) {}

  /**
   * Get the specified resource.
   *
   */
  read (req, res, id) {}

  /**
   * Update the specified resource in storage.
   *
   */
  update (req, res, id) {}

  /**
  * Remove the specified resource from storage.
  */
  destroy (req, res, id) {}
}
