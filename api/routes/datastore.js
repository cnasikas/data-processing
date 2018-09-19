import { createSimpleRouter } from '../utils/routes'
const { router, controller } = createSimpleRouter('DataStoreController')

router.get(
  '/:id/get',
  (req, res, next) => { controller.download(req, res, req.params.id).catch(next) }
)

export default router
