# Avoiding Common Attacks
A summary of the safetey precautions implemented across Marketplace and Store smart contracts to mitigate the risk of common attack patterns on smart contracts.

## Using msg.sender insted of tx.origin
The Marketplace contract is responsible for instantiating instances of Store contract. As such, it needs to pass the address of the original caller to the constructor of the Store contract. I made sure to use msg.sender, and not tx.origin in order to avoid the unreliable tx.origin.

## Integer Overflow and Underflow
The Store contract works with `uint256` type data, and some of it comes as user input so to make sure the ower- or underflow could not happen I have used SafeMath from openzeppelin-solidity.

## Pull Over Push
The Store contract utilizes a pull over push strategy for sending ETH to store owner to mitigate a potential for sending funds to resulting in a fail to prevent purchases from occuring. 

## Transaction Order Dependence
The Store contract let costumers to buy products only with already existing ID-s and for that there are requirements to set the price so there could be no coonfusion in the proccess.

## DoS with Block Gas Limit
The Marketplace contract sets a whitelist before the admin could add a new store owner instead of getting a request from addresses to be store owners, as like this way there could be no error on iterating through inrationally lot of requests.
