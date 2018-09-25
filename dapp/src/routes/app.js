import { createAppRoutes } from '../utils/routes'

// import Home from '../views/Home.js'
import DataStore from '../views/DataStore.js'
import Requests from '../views/Requests.js'
import Processors from '../views/Processors.js'
import Controllers from '../views/Controllers.js'
import Accounts from '../views/Accounts.js'
import Login from '../components/Login.js'
import AddData from '../views/AddData.js'
import AddRequest from '../views/AddRequest.js'
import AddProcessor from '../views/AddProcessor.js'
import AddController from '../views/AddController.js'
import DataDetails from '../components/DataDetails'
import RequestDetails from '../components/RequestDetails'

const appRoutes = [
  {
    path: '/datastore',
    component: DataStore
  },
  {
    path: '/datastore/add',
    component: AddData
  },
  {
    path: '/datastore/:id',
    component: DataDetails
  },
  {
    path: '/requests',
    component: Requests
  },
  {
    path: '/requests/add',
    component: AddRequest
  },
  {
    path: '/requests/:id',
    component: RequestDetails
  },
  {
    path: '/processors',
    component: Processors
  },
  {
    path: '/processors/add',
    component: AddProcessor
  },
  {
    path: '/controllers',
    component: Controllers
  },
  {
    path: '/controllers/add',
    component: AddController
  },
  {
    path: '/account',
    component: Accounts
  },
  {
    path: '/login',
    component: Login
  }
]

export default createAppRoutes(appRoutes)
