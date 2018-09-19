import EntityController from './EntityController'

import { models } from 'data-market-db'

const Controller = models.Controller

export default class ControllerEntityController extends EntityController {
  constructor () {
    super(Controller, 'controller', 'controllers')
  }
}
