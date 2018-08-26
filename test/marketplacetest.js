var Marketplace = artifacts.require("./Marketplace.sol");

contract('Marketplace', function(accounts) {

  /*  
   * This test ensures that the marketplace contract creator
   * is correctly set as the admin on the marketplace.
   * This is important because only admin is allowed to 
   * take specific actions like add store owners.
   */
  it("should set the marketplace admin correctly.", function() {
    return Marketplace.deployed()
      .then(instance => instance.admins.call(accounts[0]))
      .then(onlyAdmin => assert.equal(onlyAdmin, true, "The marketplace contract creator was not set as an admin."));
  });
/*  
   * This test ensures that admins are able add store
   * owner to whitelist.
   */
  it("should add a store owner to storeOWners.", function() {
    let marketplaceInstance;

    return Marketplace.deployed()
      .then(instance => {
        marketplaceInstance = instance;
      })
      .then(() => marketplaceInstance.addAddressToWhitelist.sendTransaction(accounts[1], {from: accounts[0]}))
      .then(() => marketplaceInstance.addStoreOwner.sendTransaction( accounts[1], {from: accounts[0]}))
      .then(() => marketplaceInstance.storeOwners.call(accounts[1]))
      .then(onlyStoreOwner => {
        assert.equal(onlyStoreOwner, true, "The store owner was not added correctly.");
      });
  });


  /*  
   * This test ensures that the various types of users are correctly identified
   * in order to display the appropriate view in the UI.
   */
  it("should correctly identify an address as an admin.", function() {
    let marketplaceInstance;

    return Marketplace.deployed()
      .then(instance => {
        marketplaceInstance = instance;
      })
      .then(() => marketplaceInstance.getUserType.call({from: accounts[0]}))
      .then(accountType => assert.equal(accountType, 'admin', "Admin address not identified correctly."));
  });

  /*  
   * This test ensures that the various types of users are correctly identified
   * in order to display the appropriate view in the UI.
   */
  it("should correctly identify an address as a store owner.", function() {
    let marketplaceInstance;

    return Marketplace.deployed()
      .then(instance => {
        marketplaceInstance = instance;
      })
      .then(() => marketplaceInstance.getUserType.call({from: accounts[1]}))
      .then(accountType => assert.equal(accountType, 'storeOwner', "Store Owner address not identified correctly."));
  });

  /*  
   * This test ensures that the various types of users are correctly identified
   * in order to display the appropriate view in the UI.
   */
  it("should correctly identify an address as a shopper.", function() {
    let marketplaceInstance;

    return Marketplace.deployed()
      .then(instance => {
        marketplaceInstance = instance;
      })
      .then(() => marketplaceInstance.getUserType.call({from: accounts[2]}))
      .then(accountType => assert.equal(accountType, 'shopper', "Shopper address not identified correctly."));
  });

  /*  
   * This test ensures that a store owner can successfully create a new 
   * store contract instance and have that store registered in the marketplace.
   */
  it("should let a store owner generate a new store.", function() {
    let marketplaceInstance;

    return Marketplace.deployed()
      .then(instance => {
        marketplaceInstance = instance;
      })
      .then(() => marketplaceInstance.createNewStore.sendTransaction(
        'Test Store', 
        'Test Store Description', 
        {from: accounts[1]}))
      .then(() => marketplaceInstance.getStoreAddressesByOwner.call({from: accounts[1]}))
      .then(storeAddresses => assert.equal(storeAddresses.length, 1, "Store was not successfully created."));
  });

});
  

