import EntityController from './EntityController'
import {Controller, Address} from '../models'
import {simpleSave} from '../utils/db'

export default class ControllerEntityController extends EntityController {
  constructor () {
    super(Controller, 'controller', 'controllers')
  }
}
