# Design Pattern Decisions

## Contract Design Decisions
 
### Marketplace Contract
Lead contract, setting and storeing the types of accounts based on whitelist, and admin actions into three types:
Admin
StoreOwner
Shopper/costumer
Let StoreOwners to create new store contracts, and also has functions to get the addresses of them. 
Variables based on mapping to to reduce the need to loop over arbitrary length arrays.

### Store Contract
Store contracts are made for StoreOwners and Shoppers to interact with the stores like adding new product, buy, withdraw etc.

Each store created in the marketplace is it's own Store contract instance. This is required to make stores able to hold Ether, and have special properties related to store ownership. This way, each instance is responsible for holding it's own ETH, which reduces the risks from attacks, or fails as one contract does not store all the ETH.

## Other Patterns Included in Design

### The Circuit Breaker or Emergency Stop Pattern
Emergency Stop Pattern have been implemented into Store contract, with pause,unpause function letting the store owner pause their store in any case when smoething going not in the right direction.

### Restricted Access Pattern
Marketplace and Store contract, both have been made with accessibility modifiers like onlyAdmin and onlyStoreOwner to be able to restrict who can make different actions. For example it's required for the marketplace to be able to select who can make Stores to be clear about what is going on, and for this function only the admin have got access.

### Library Usage
Used Openzeppelin solidity in both contracts for ownership, whitelist, pasueability. Also have used SafeMath to make sure there wont be integer owerflows and underflows.
