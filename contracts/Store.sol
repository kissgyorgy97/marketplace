pragma solidity ^0.4.18;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";

// Storeowners marketplace
contract Store is Ownable, Pausable {
  using SafeMath for uint256;

  address public owner;
  string public name;
  string public description;
  uint256 public newestProductId;
  bool public paused = false;

  mapping (uint256 => Product) public productsById;

  struct Product {

    uint id;
    uint productCount;
    string name;
    string description;
    uint price;
    uint quantity;
  }

  event NewProductAdded(string name, string description, uint256 indexed id, uint256 price, uint256 quantity);
  event ProductCountUpdated(uint256 indexed id, uint256 newProductCount);
  event PurchaseMade(uint256 indexed id, uint256 quantity);
  event Paused(bool ispaused);
  event Unpaused(bool isunpaused);

  /**@dev check if string is not too long */

  modifier stringLengthOkay(string str) {
    require(bytes(str).length <= 32);
    _;
  }

/**@dev check if product exists
  *@param id of the product */

  modifier idExists(uint256 id) {
    require(
      newestProductId.sub(id) >= 0,
      "Product don't exist.");
    _;
  }

/**@dev check if there is enough product
  *@param id id of the product
  *@param quantity quantity of the product */

  modifier enoughProduct(uint256 id, uint256 quantity) {
    require(
      productsById[id].productCount.sub(quantity) >= 0,
      "Not enough product.");
    _;
  }

  /** * @dev check if costumer sent enough ether for the quantity of the product the costumer wants to buy
      * @param id id of the product that the costumer is buying 
      * @param quantity quantity of the product that the costumer is buying*/

  modifier enoughEthSent(uint256 id, uint256 quantity) {
      require(
        msg.value >= productsById[id].price.mul(quantity),
        "Not enough Ether.");

      _;

      if (msg.value > productsById[id].price.mul(quantity)) {
        msg.sender.transfer(msg.value.sub(productsById[id].price.mul(quantity)));
      }
  }

   constructor(address sender, string storeName, string storeDescription) 
    public
    stringLengthOkay(storeName)
    stringLengthOkay(storeDescription) {
    owner = sender;
    name = storeName;
    description = storeDescription;
    newestProductId = 0;
  }

   /** @dev Owner can add products to store.
    * @param newProductName The name of the product.
    * @param newProductDescription The description of the product.
    * @param newProductPrice The price of the product.
    * @param newProductQuantity The quantity of the product
    */

  function addNewProduct(string newProductName, string newProductDescription, uint256 newProductPrice, uint256 newProductQuantity)
    public
    onlyOwner
    stringLengthOkay(newProductName)
    stringLengthOkay(newProductDescription) {
      
      Product memory newProduct = Product({
      id: newestProductId.add(1), 
      productCount: 0, 
      name: newProductName, 
      description: newProductDescription,
      price: newProductPrice,
      quantity: newProductQuantity
    });

    productsById[newestProductId.add(1)] = newProduct;
    newestProductId = newestProductId.add(1);
    emit NewProductAdded(newProduct.name, newProduct.description, newProduct.id, newProduct.price, newProduct.quantity);
  }

 /** @dev Owner can withdraw any funds from the store.
    */
  function withdraw() public payable onlyOwner {
        owner.transfer(address(this).balance);
  }
  
  /** @dev Owner can update the productCount.
    * @param id The id of the product.
    * @param newProductCount The updated product count.
    */

  function updateProductCount(uint256 id, uint256 newProductCount)
    public
    onlyOwner
    idExists(id) {
      productsById[id].productCount = newProductCount;
      emit ProductCountUpdated(id, newProductCount);
  }

/** @dev Costumers call this to purchase a given product from the store.
    * @param id The id of the product.
    * @param quantity The number of product the user is buying.
    */

  function purchaseProduct(uint256 id, uint256 quantity)
    public 
    payable
    idExists(id)
    enoughProduct(id, quantity)
    enoughEthSent(id, quantity) {

      productsById[id].productCount = productsById[id].productCount.sub(quantity);
      emit PurchaseMade(id, quantity);
      
  }

   /**
   * @dev called by the owner to pause, triggers stopped state
   */
  function pause() public onlyOwner whenNotPaused {
    paused = true;
    emit Paused(true);
  }

  /**
   * @dev called by the owner to unpause, returns to normal state
   */
  function unpause() public onlyOwner whenPaused {
    paused = false;
    emit Unpaused(true);
  }


 
}
