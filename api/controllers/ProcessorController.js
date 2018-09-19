import EntityController from './EntityController'
import { models } from 'data-market-db'

const Processor = models.Processor

export default class ProcessorController extends EntityController {
  constructor () {
    super(Processor, 'processor', 'processors')
  }
}
