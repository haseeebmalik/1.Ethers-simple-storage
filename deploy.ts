// const ethers = require("ethers");
// const fs = require("fs-extra");
import {ethers} from "ethers"
import * as fs from "fs-extra"
import "dotenv/config"

require("dotenv").config()
async function main() {
  //compile them in our code
  //compile them seperetely
  //below is our local blockchain rpc url from Ganache
  //http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL!
  );
  // const wallet = new ethers.Wallet(
  //   process.env.PRIVATE_KEY,
  //   provider
  // );
const encryptedJson=fs.readFileSync("./.encryptedKey.json","utf8")
//here we decrypt our private key
  let wallet=ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PRIVATE_KEY_PASSWORD!
  )
  wallet=await wallet.connect(provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_simpleStorage.bin",
    "utf8"
  );

//now we deploy contract with contract factory.
const contractFactory=new ethers.ContractFactory(abi,binary,wallet)
  console.log("Deploying. please wait...")
const contract=await contractFactory.deploy();
console.log("contract:",contract)

//this will wait for one confermation block after the transaction
const transactionReceipt=await contract.deployTransaction.wait(1)
console.log("contractAddress:",contract.address)
console.log("here is the deployment transaction :")
console.log(contract.deployTransaction)
console.log("deploymentReceipt:",transactionReceipt)





//Lets deploy with only transaction data! i.e without ether.js we have to do all this to make a transaction ====>

//here we get the transaction count of a particular address
// const nonce=await wallet.getTransactionCount();
// const tx={
//   nounce:nonce,
//   gasPrice: 20000000000,
//   gasLimit: 1000000,
//   to:null,
//   value:0,
//   data: "0x60806040526040518060400160405280600281526020016040518060400160405280600681526020017f6861736565620000000000000000000000000000000000000000000000000000815250815250600160008201518160000155602082015181600101908051906020019061007792919061008c565b50505034801561008657600080fd5b50610190565b8280546100989061012f565b90600052602060002090601f0160209004810192826100ba5760008555610101565b82601f106100d357805160ff1916838001178555610101565b82800160010185558215610101579182015b828111156101005782518255916020019190600101906100e5565b5b50905061010e9190610112565b5090565b5b8082111561012b576000816000905550600101610113565b5090565b6000600282049050600182168061014757607f821691505b6020821081141561015b5761015a610161565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6108808061019f6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806377ec2b551161005b57806377ec2b55146100d85780639e7a13ad146100f7578063a6b7fc5b14610128578063b2ac62ef146101465761007d565b80634f2be91f146100825780636057361d146100a05780636f760f41146100bc575b600080fd5b61008a610176565b6040516100979190610639565b60405180910390f35b6100ba60048036038101906100b5919061057c565b61017f565b005b6100d660048036038101906100d19190610520565b610192565b005b6100e0610222565b6040516100ee929190610654565b60405180910390f35b610111600480360381019061010c919061057c565b6102bc565b60405161011f929190610654565b60405180910390f35b610130610378565b60405161013d9190610639565b60405180910390f35b610160600480360381019061015b91906104d7565b610381565b60405161016d9190610639565b60405180910390f35b60006002905090565b8060008190555061018e610378565b5050565b600360405180604001604052808381526020018481525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906101f89291906103af565b5050508060048360405161020c9190610622565b9081526020016040518091039020819055505050565b60018060000154908060010180546102399061074d565b80601f01602080910402602001604051908101604052809291908181526020018280546102659061074d565b80156102b25780601f10610287576101008083540402835291602001916102b2565b820191906000526020600020905b81548152906001019060200180831161029557829003601f168201915b5050505050905082565b600381815481106102cc57600080fd5b90600052602060002090600202016000915090508060000154908060010180546102f59061074d565b80601f01602080910402602001604051908101604052809291908181526020018280546103219061074d565b801561036e5780601f106103435761010080835404028352916020019161036e565b820191906000526020600020905b81548152906001019060200180831161035157829003601f168201915b5050505050905082565b60008054905090565b6004818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b8280546103bb9061074d565b90600052602060002090601f0160209004810192826103dd5760008555610424565b82601f106103f657805160ff1916838001178555610424565b82800160010185558215610424579182015b82811115610423578251825591602001919060010190610408565b5b5090506104319190610435565b5090565b5b8082111561044e576000816000905550600101610436565b5090565b6000610465610460846106a9565b610684565b90508281526020810184848401111561048157610480610813565b5b61048c84828561070b565b509392505050565b600082601f8301126104a9576104a861080e565b5b81356104b9848260208601610452565b91505092915050565b6000813590506104d181610833565b92915050565b6000602082840312156104ed576104ec61081d565b5b600082013567ffffffffffffffff81111561050b5761050a610818565b5b61051784828501610494565b91505092915050565b600080604083850312156105375761053661081d565b5b600083013567ffffffffffffffff81111561055557610554610818565b5b61056185828601610494565b9250506020610572858286016104c2565b9150509250929050565b6000602082840312156105925761059161081d565b5b60006105a0848285016104c2565b91505092915050565b60006105b4826106da565b6105be81856106e5565b93506105ce81856020860161071a565b6105d781610822565b840191505092915050565b60006105ed826106da565b6105f781856106f6565b935061060781856020860161071a565b80840191505092915050565b61061c81610701565b82525050565b600061062e82846105e2565b915081905092915050565b600060208201905061064e6000830184610613565b92915050565b60006040820190506106696000830185610613565b818103602083015261067b81846105a9565b90509392505050565b600061068e61069f565b905061069a828261077f565b919050565b6000604051905090565b600067ffffffffffffffff8211156106c4576106c36107df565b5b6106cd82610822565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561073857808201518184015260208101905061071d565b83811115610747576000848401525b50505050565b6000600282049050600182168061076557607f821691505b60208210811415610779576107786107b0565b5b50919050565b61078882610822565b810181811067ffffffffffffffff821117156107a7576107a66107df565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61083c81610701565b811461084757600080fd5b5056fea2646970667358221220760b644065a98612b3b84405c002f5ba64968681ffca04e9ad74f453f3aecda164736f6c63430008070033",
//   chainId:1337,
// }
// //this just sign a transaction
// const signedTxResponse=await wallet.signTransaction(tx)
// console.log("signedTxResponse:",signedTxResponse);

// //but this will send a transaction

// const sentTxResponse=await wallet.sendTransaction(tx)
// await sentTxResponse.wait(1)
// console.log("sentTxResponse",sentTxResponse)

//Lets deploy with only transaction data! i.e without ether.js we have to do all this to make a transaction ====>




//Now call the functions of contract which we just deployed

const currentFavouriteNumber =await contract.retrive();
//it will return us a bignumber, because js have issues to read a large number
//so now we convert it into string to read it easily
console.log(`currentFavouriteNumber:${currentFavouriteNumber.toString()}`)

//here we give number in string ,because if we give a large number js will get confuse,
//hence ether.js is smart enough to know that this string is actually a number.
const transactionResponse =await contract.store("7");
const transactionRecept=await transactionResponse.wait(1);
const updatedFavouriteNumber=await contract.retrive();
console.log(`updated favourite number is : ${updatedFavouriteNumber}`)

}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
