import { Context, Network, ContextWallet, ContextDocument, Version, Action } from '@contextdao/sdk';
import * as dotenv from "dotenv";
dotenv.config();


async function main() {
  // Connect Context.
    const context: Context = new Context({
      network: Network.TESTNET,
      rpcProviderUrl: process.env.RPC
    });

    // Init a document and connect a wallet.
    const wallet: ContextWallet = await context.wallet(process.env.PRIVATE_KEY);
    const doc = await context.init('context', wallet);

    // Prepare the document. First action : write
    doc.write({ name: 'Context Protocol' });

    // Save: commit.
    let res:any = await doc.commit('First Commit');    
    console.log(`Arweave transaction : ${res}`);

    // Update Version: commit.
    res = await doc.push(Version.MAJOR);
    console.log(`Version : ${res.version.major}.${res.version.minor}.${res.version.patch}`);
}

main().catch((error) => { console.error(error); });  
