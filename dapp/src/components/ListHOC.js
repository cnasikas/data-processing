import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AddResourceBtn from '../components/AddResourceBtn.js'

export default function withList (ListComponent, key, actions, options = {}) {
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }, dispatch)
  })

  const mapStateToProps = state => ({
    [key]: state[key]
  })

  class NewList extends React.Component {
    componentDidMount () {
      this.props.actions.getList().catch(e => console.log(e))
    }

    render () {
      let items = ''
      if (this.props[key].length > 0) {
        items = this.props[key].map((data, index) => {
          return <ListComponent {...data} key={index} index={index} type={key} {...options} />
        })
      }

      return (
        <section id={key} className='list-group entities'>
          {items}
          <AddResourceBtn to={'/' + key + '/add'} text={options.buttonTxt} />
        </section>
      )
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(NewList)
}
