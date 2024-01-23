import { Context, Network, ContextDocument } from '@contextdao/sdk';


/**
 * Main function to read a document from a context.
 * 
 * This function initializes a new context with the TESTNET network.
 * It then clones a document from the 'startup/venture' context.
 * After cloning the document, it reads the data from the document and logs it.
 * 
 * @async
 * @function
 * @throws {Error} Will throw an error if the document cannot be cloned or read.
 */
async function main() {
    const context: Context = new Context({ network: Network.TESTNET });

    // Connect the wallet of a document that is a curator.
    const doc: ContextDocument = await context.clone('startup/venture');
    const data = await doc.read();
    console.log(data);
}
main().catch((error) => { console.error(error); });  
