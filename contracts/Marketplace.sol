pragma solidity ^0.4.24;

import "./Store.sol";
import "openzeppelin-solidity/contracts/access/Whitelist.sol";

/** @title Marketplace contract. */
contract Marketplace is Whitelist {
    mapping (address => bool) public admins;
    mapping (address => bool) public storeOwners;
    mapping (address => address[]) public storeAddressesByOwner;

    event StoreOwnerAdded(address storeOwnerAddress);
    event NewStoreCreated(address owner, address store);

    modifier onlyAdmin() {
        require(admins[msg.sender] == true);
        _;
    }

    modifier onlyStoreOwner() {
        require(storeOwners[msg.sender] == true);
        _;
    }

    constructor() public {
        admins[msg.sender] = true;
    }

  /** @dev Gets a list of store contract addresses that the msg.sender is the owner of.
    * @return The list of store contract addresses.
    */
    function getStoreAddressesByOwner() public view returns (address[]) {
        return storeAddressesByOwner[msg.sender];
    }

  /** @dev Generates a new store contract with msg.sender as the owner.
    * @param name The name of the store.
    * @param description The description of the store.
    */
    function createNewStore(string name, string description) public onlyStoreOwner onlyIfWhitelisted(msg.sender) {
        Store newStore = new Store(msg.sender, name, description);
        storeAddressesByOwner[msg.sender].push(newStore);
        emit NewStoreCreated(msg.sender, newStore);
    }

  /** @dev Figures out what type of user msg.sender is.
    * @return A string indicating what type of user msg.sender is.
    */
    function getUserType() public view returns (string) {
        if (admins[msg.sender] == true) {
            return "admin";
        }
        else if (storeOwners[msg.sender] == true) {
            return "storeOwner";
        }
        else {
            return "shopper";
        }
    }


  /** @dev Admins can withdraw any funds sent to the contract.
    */
    function withdraw() public payable onlyAdmin {
        msg.sender.transfer(address(this).balance);
    }

   
   /**
   * @dev add an address to the whitelist
   * @param storeOwner address
   * @return true if the address was added to the whitelist, false if the address was already in the whitelist
   */
    function addAddressToWhitelist(address storeOwner)
    public
    onlyAdmin
    {
        addRole(storeOwner, ROLE_WHITELISTED);

    }

    function addStoreOwner( address storeOwner) public onlyAdmin {
        require(whitelist(storeOwner));
        storeOwners[storeOwner] = true;

        emit StoreOwnerAdded(storeOwner);
    }

  /**
   * @dev getter to determine if address is in whitelist
   */
    function whitelist(address _storeOwner)
    public
    view
    returns (bool)
    {
        return hasRole(_storeOwner, ROLE_WHITELISTED);
    }


 
  /** @dev Default payable function.
    */
    function () public payable {}
}
