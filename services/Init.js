import low from 'lowdb'
import _ from 'lodash'

function db() {

	/* Write returns a promise. Fix it. */
	/* Start server listen afterd db init and hanlde errors */

	const contracts = low('./db/contracts.js')
	
    if(_.isEmpty(contracts.getState())){

    	contracts.defaults({ contracts: {datastore: [], requests: []}, user: {} }).write()
    }
}

export default () => {

	db()
}