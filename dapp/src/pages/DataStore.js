import React from 'react'
import withList from '../components/ListHOC'
import { getDataStore } from '../actions/ActionCreators'
import Data from '../components/Data.js'

import '../css/DataStore.css'

const DataList = withList(Data, 'datastore', {getList: getDataStore}, 'Add dataset')

export default class DataStore extends React.Component {
  render () {
    return (
      <DataList />
    )
  }
}
