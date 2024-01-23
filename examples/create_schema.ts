import { Context, Network, ContextWallet, ContextDocument, Version, Action } from '@contextdao/sdk';
import * as dotenv from "dotenv";
dotenv.config();

/**
 * Main function to create a new schema in a context.
 * 
 * This function initializes a new context with the TESTNET network and a specified RPC provider URL.
 * It then connects to a wallet using a private key.
 * After connecting to the wallet, it initializes a document with the 'context/schemadef' name.
 * 
 * The function then writes a JSON schema to the document and commits the changes.
 * After committing, it pushes a new version of the document and logs the result.
 * 
 * @async
 * @function
 * @throws {Error} Will throw an error if the wallet cannot be connected, the document cannot be initialized, or the commit or push operations fail.
 */
async function main() {
    const context: Context = new Context({
      network: Network.TESTNET,
      rpcProviderUrl: process.env.RPC_PROVIDER
  });

    // Connect the wallet of a document that is a curator.
    const wallet: ContextWallet = await context.wallet(process.env.PRIVATE_KEY); 
    const schema: ContextDocument = await context.init('context/schemadef', wallet);

    const jsonSchema = {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Human Schema",
      "type": "object",
      "properties": {
        "lang": {
          "type": "string",
          "description": "Favorite Language"
        },
        "github": {
          "type": "string",
          "description": "github of the coder"
        }
      },
      "required": [
        "github"
      ]
    };

    // Prepare the document. First action : write
    schema.write(jsonSchema);

    // Save: commit.
    let res:any = await schema.commit('First Commit of the Schema');    
    console.log(`Arweave transaction : ${res}`);
    
    // Update Version: commit.
    res = await schema.push(Version.MAJOR);
    console.log(`Version : ${res.version.major}.${res.version.minor}.${res.version.patch}`);
    console.log(`https://testrpc.ctx.xyz/context/schemadef`);
}

main().catch((error) => { console.error(error); });  
