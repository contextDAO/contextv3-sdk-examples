import { Context, Network, ContextDocument } from '@contextdao/sdk';

async function main() {
    const context: Context = new Context({ network: Network.TESTNET });

    // Connect the wallet of a document that is a curator.
    const doc: ContextDocument = await context.clone('startup/venture');
    const data = await doc.read();
    console.log(data);
}

main().catch((error) => { console.error(error); });  
