import { Context, Network, ContextWallet, ContextDocument } from '@contextdao/sdk';
import * as dotenv from "dotenv";
dotenv.config();


async function main() {
    const network = Network.TESTNET;
    const rpcProviderUrl = process.env.RPC;
    const context: Context = new Context({ network, rpcProviderUrl });

    // Connect the wallet of a document that is a curator.
    const wallet: ContextWallet = await context.wallet(process.env.PRIV1); 
    const doc: ContextDocument = await context.init('context', wallet);

    // Finally, context registers the name (level1) and deposit tokens
    console.log('Registering alex1...');
    await doc.register('alex1', '0x32F76D220FB46c799E14C4EE6D49F0318f3c2641', 5);
    console.log('alex 1 has been registered');
}

main().catch((error) => { console.error(error); });  
