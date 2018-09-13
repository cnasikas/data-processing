import EntityController from './EntityController'
import {Processor, Address} from '../models'
import {simpleSave} from '../utils/db'

export default class ProcessorController extends EntityController {
  constructor () {
    super(Processor, 'processor', 'processors')
  }
}
