// const ethers=require("ethers")
// const fs =require("fs-extra")
// require("dotenv").config()

import {ethers} from "ethers"
import * as fs from "fs-extra"
import "dotenv/config"


async function main(){
  const wallet=new ethers.Wallet(process.env.PRIVATE_KEY!);
  //Now we encrypt our private key with a password,which only decrypt with process.env.PRIVATE_KEY_PASSWORD
  const encryptedJsonKey=await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD!,
    process.env.PRIVATE_KEY!
  )
  console.log("encryptedJsonKey",encryptedJsonKey)
  //Now we save our encrypted private key into a file 
  //and delete process.env.PRIVATE_KEY_PASSWORD and process.env.PRIVATE_KEY from .env file

  fs.writeFileSync("./.encryptedKey.json",encryptedJsonKey)

  //now add .encryptedKey.json in .gitignore
  //and remove process.env.PRIVATE_KEY from .env file
  //you can also remove process.env.PRIVATE_KEY_PASSWORD for time being and include it when we deploy contract,so that no one can get it if our laptop get hacked 
  //because now we dont need it as we have ".encryptedKey.json" file which have our encrypted private key. 
}
main().then(()=>process.exit(0))
.catch((error)=>{
  console.error(error);
  process.exit(1)
})