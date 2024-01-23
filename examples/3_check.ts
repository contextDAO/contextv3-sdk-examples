import { Context, Network, ContextWallet, ContextDocument } from '@contextdao/sdk';
import * as dotenv from "dotenv";
dotenv.config();


async function main() {
    const network = Network.TESTNET;
    const rpcProviderUrl = process.env.RPC;
    const context: Context = new Context({ network, rpcProviderUrl });

    // Connect the wallet of a document that is a curator.
    const wallet: ContextWallet = await context.wallet(process.env.PRIV2); 
    const doc: ContextDocument = await context.init('alex1', wallet);
    const data = await doc.read();
    console.log(data);

}

main().catch((error) => { console.error(error); });  
