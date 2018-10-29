import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EntityDetails from './EntityDetails'

import '../css/Entities.css'

import {
  controllerActions
} from '../actions'

const getController = controllerActions.getController

class ControllerDetails extends EntityDetails {
  constructor () {
    super()
    this.title = 'Controller'
    this.key = 'controller'
  }

  componentDidMount () {
    this.props.actions.getController({ id: this.props.match.params.id }).catch(e => console.log(e))
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getController }, dispatch)
})

const mapStateToProps = state => ({
  controller: state.controller[0]
})

export default connect(mapStateToProps, mapDispatchToProps)(ControllerDetails)
