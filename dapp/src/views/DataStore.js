import React from 'react'
import withList from '../components/ListHOC'
import Data from '../components/Data.js'

import '../css/DataStore.css'

import {
  datastoreActions
} from '../actions'

const getDataStore = datastoreActions.getDataStore

const DataList = withList(Data, 'datastore', { getList: getDataStore }, 'Add dataset')

export default class DataStore extends React.Component {
  render () {
    return (
      <DataList />
    )
  }
}
