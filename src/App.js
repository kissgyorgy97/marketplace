import React, { Component } from 'react'
import MarketplaceContract from '../build/contracts/Marketplace.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accountType: '',
      web3: null,
      marketplaceInstance: null,
      currentAccount: ''
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {

    const contract = require('truffle-contract')
    const marketplace = contract(MarketplaceContract)
    marketplace.setProvider(this.state.web3.currentProvider)

    this.state.web3.eth.getAccounts((error, accounts) => {
      marketplace.deployed()
        .then((instance) => this.setState({marketplaceInstance: instance, currentAccount: accounts[0]}))
        .then(() => this.state.marketplaceInstance.getUserType.call({from: accounts[0]}))
        .then((accountType) => this.setState({ accountType: accountType }))
    })
    
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Marketplace Example</h1>
              <p>If your contracts compiled and migrated successfully, below will show account type.</p>
              <p></p>
              <p>The account type is: {this.state.accountType} and your public address is {this.state.currentAccount}</p>
            </div>
          </div>
          
        </main>
      </div>
    );
  }
}

export default App
