import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EntityDetails from './EntityDetails'

import '../css/Entities.css'

import {
  processorActions
} from '../actions'

const getProcessor = processorActions.getProcessor

class ProcessorDetails extends EntityDetails {
  constructor () {
    super()
    this.title = 'Processor'
    this.key = 'processor'
  }

  componentDidMount () {
    this.props.actions.getProcessor({ id: this.props.match.params.id }).catch(e => console.log(e))
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getProcessor }, dispatch)
})

const mapStateToProps = state => ({
  processor: state.processor[0]
})

export default connect(mapStateToProps, mapDispatchToProps)(ProcessorDetails)
