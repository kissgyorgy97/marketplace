var Store = artifacts.require("./Store.sol");


contract('Store', function(accounts) {
  let contract;

  before(() => Store.new(accounts[0], 'Test Store Name', 'Test Store Description')
    .then(instance => contract = instance));

  /*  
   * This test checks if that the store contract creator
   * is correctly set as the owner of the store.
   */
  it("should set the store owner correctly.", function() {
    return contract.owner.call()
      .then(owner => assert.equal(owner, accounts[0], "The store contract creator was not set as owner."));
  });

  /*  
   * This test ensures that the store owner can create
   * a new product in the store
   */
  it("should allow store owner to add a new product.", function() {
    return contract.addNewProduct.sendTransaction('Test Product 1', 'Test Product 1 Description', 1,1)
      .then(() => contract.productsById.call(1))
  });

  /*  
   * This test ensures that the store owner can update
   * productCount for an existing product.
   */
  it("should allow store owner update productCount to an existing product.", function() {
    return contract.updateProductCount.sendTransaction(1, 5)
      .then(() => contract.productsById.call(1))
      .then(product => {
        assert.equal(product[1].toNumber(), 5, "ProductCount was not updated correctly.");
      });
  });

  /*  
   * This test ensures that the store owner can update
   * inventory for an existing product.
   */
  it("should allow a shopper to purchase a product from the store, and productCount reduces by correct amount.", function() {
    return contract.purchaseProduct.sendTransaction(1, 5, {value: 5})
      .then(() => contract.productsById.call(1))
      .then(product => {
        assert.equal(product[1].toNumber(), 0, "ProductCount was not updated after a sale correctly.");
      });
  });

  /*  
   * This test ensures that the store owner can withdraw
   * funds from the store upon successful sale.
   */
  it("should allow a store owner to withdraw funds after a sale.", function() {
    var ownerBalanceBefore = web3.eth.getBalance(accounts[0]).toNumber();
    var contractBalanceBefore = web3.eth.getBalance(contract.address).toNumber();

    return contract.withdraw.sendTransaction({from: accounts[0]})
      .then(() => assert.equal(ownerBalanceBefore - contractBalanceBefore, ownerBalanceBefore, "Contract balance did not successfully transfer to owner."));
  });



});