import React from 'react'
import axios from 'axios'

import Contract from '../components/Contract.js'

import '../css/Contracts.css'

export default class Contracts extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			contracts: null
		}
	}

	componentDidMount(){

		axios.get('http://localhost:3001/api/contracts').then( (response) => {

			this.setState((prevState, props) => {
			  return {contracts: response.data.contracts};
			})

		}).catch( (error) => {
   			console.log(error)
  		});
	}

    render() {

    	let contracts = ''

    	if(this.state.contracts){

            contracts = [...Object.keys(this.state.contracts)].map((key) => {
                let contract = this.state.contracts[key]
                return <Contract key={contract.id} id={contract.id}></Contract>
            })

    	}

        return(

            <section id="contracts">
            	{contracts}	
            </section>
        );
    }
}