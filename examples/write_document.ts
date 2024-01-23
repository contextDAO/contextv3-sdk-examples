import { Context, Network, ContextWallet, ContextDocument, Version, Action } from '@contextdao/sdk';
import * as dotenv from "dotenv";
dotenv.config();


async function main() {
    const name = 'polygon';
    const context: Context = new Context({
        network: Network.TESTNET,
        rpcProviderUrl: process.env.RPC_PROVIDER
    });
    
  
    // Connect the wallet of a document that is a curator.
    const wallet: ContextWallet = await context.wallet(process.env.PRIVATE_KEY); 
    const doc: ContextDocument = await context.init(name, wallet);
  
    // Prepare the document. First action : write
    doc.write({ name: 'Polygon Blockchain' });
  
    // Save: commit.
    let res:any = await doc.commit('First Commit');    
    console.log(`Arweave transaction : ${res}`);
  
    // Update Version: commit.
    res = await doc.push(Version.MAJOR);
    console.log(`Version : ${res.version.major}.${res.version.minor}.${res.version.patch}`);
    console.log(`https://testrpc.ctx.xyz/${name}`);
}

main().catch((error) => { console.error(error); });  
