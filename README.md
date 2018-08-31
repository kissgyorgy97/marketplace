# marketplace
## marketplace example dapp still under improvements(very welcome for any contributors ;) )

### Frontend now only get your address and show account type and show public address
### Setup/Run Steps
Note 1: These steps assume you have NodeJS, NPM, Truffle, Git, Ganache and MetaMask already set up. If you are missing any of those dependencies, please find their respective documentation online and set them up first.

Note 2: these instructions use Ganache but you could use also truffle develop.

1. Open a terminal session and navigate to the location you'd like to store a copy of the repo in.
2. Clone the repo: `git clone https://github.com/kissgyorgy97/marketplace.git`.
3. Move into the root directory of the project: `cd marketplace`.
4. Install ETHpm library dependencies (Open Zeppelin): `truffle install openzeppelin-solidity`.
5. Start Ganache.
6. Migrate the contracts to the lolcal blockchain: `truffle migrate`.
7. Open a second terminal window and navigate to the root directory of the project.
8. Install front end dependencies via npm: `npm install`.
9. Build the front end react app and open it in the browser (at http://localhost:3000): `npm run start`.

 ##!!
 Mind that when you are deploying to Ganache you are using the first generated account so when you start the application, you need to import to metamask the private key of that account for recognizing as admin.

### Running test

1. Start Ganache.
2. Migrate contracts to Ganache: `truffle migrate`.
3. Run the Tests: `truffle test`.

### Issues

When you are testing, running the application several time not just once make sure to use `truffle migrate --reset` .


### Sources used:
cryptozombies.io, Openzeppelin-solidity, Truffle, => truffle-react box, NPM, Web3, Infura.io, articles from Medium, 
Consensys sources(open, and 2018 developer program), Decentraland.io, Originprotocol, marketplaces found around ;)
