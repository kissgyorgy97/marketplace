/**
 * 
 var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "message pond bunker announce asset cheese short dumb mercy jaguar fall east";

module.exports = {
  networks: {
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/RqyGxlhDAe3zgif9Re1B "),
      
      network_id: 3
    }   
  }
}
 */ 

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
