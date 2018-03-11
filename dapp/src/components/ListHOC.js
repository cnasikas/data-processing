import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import AddResourceBtn from '../components/AddResourceBtn.js'

export default function withList (ListComponent, key, actions, buttonTxt) {
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
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
          let date = !isNaN(new Date(data.created_at)) ? moment(new Date(data.created_at)).format('DD/MM/YYYY') : 'No date provided'
          return <ListComponent {...data} key={index} date={date} id={index} />
        })
      }

      return (
        <section id={key} className='list-group'>
          {items}
          <AddResourceBtn to={'/' + key + '/add'} text={buttonTxt} />
        </section>
      )
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(NewList)
}