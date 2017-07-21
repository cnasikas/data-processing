import Web3 from 'web3'
import truffle from '../truffle.js'

export class Web3Service {

	constructor(){
		this.web3 = new Web3()
		this.providerURL = 'http://' + truffle.networks.development.host + ':' + truffle.networks.development.port
		this.setProvider()
	}

	setProvider(){
		this.web3.setProvider(new this.web3.providers.HttpProvider(this.providerURL));
	}

	getBalance(address){
		return this.web3.fromWei(this.web3.eth.getBalance(address), 'ether').toString(10)
	}
}