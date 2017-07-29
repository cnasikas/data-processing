import React from 'react'
import axios from 'axios'

import ContractType from '../components/ContractType.js'

import '../css/Contracts.css'

export default class ContractTypes extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			contracts: null
		}
	}

	componentDidMount(){

		axios.get('http://localhost:3001/api/contracts/types').then( (response) => {

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
                return <ContractType key={contract.id} title={contract.title} desc={contract.desc} id={contract.id}></ContractType>
            })

    	}

        return(

            <section id="contracts">
            	{contracts}	
            </section>
        );
    }
}