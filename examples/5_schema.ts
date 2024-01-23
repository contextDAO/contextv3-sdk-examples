import { Context, Network, ContextWallet, ContextDocument, Version, Action } from '@contextdao/sdk';
import * as dotenv from "dotenv";
dotenv.config();


async function main() {
    const network = Network.TESTNET;
    const rpcProviderUrl = process.env.RPC;
    const context: Context = new Context({ network, rpcProviderUrl });

    // Connect the wallet of a document that is a curator.
    const wallet: ContextWallet = await context.wallet(process.env.PRIV2); 
    const doc: ContextDocument = await context.init('alex1/coder', wallet);

    const schema = {
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

    // First commit
    await doc.commit({
      action: 'write',
      path: '/',
      data: schema,
    } as Action);
    await doc.push(Version.MAJOR, 'First version of the schema');
}

main().catch((error) => { console.error(error); });  
