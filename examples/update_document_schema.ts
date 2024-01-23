import { Context, Network, ContextWallet, ContextDocument, Version, Action } from '@contextdao/sdk';
import * as dotenv from "dotenv";
dotenv.config();

/**
 * Main function to write and commit a document in a context.
 * 
 * This function initializes a new context with the TESTNET network and a specified RPC provider URL.
 * It then connects to a wallet using a private key.
 * After connecting to the wallet, it initializes a document with a specified name.
 * 
 * The function then writes data to the document and commits the changes.
 * After committing, it pushes a new version of the document and logs the result.
 * 
 * @async
 * @function
 * @throws {Error} Will throw an error if the wallet cannot be connected, the document cannot be initialized, or the commit or push operations fail.
 */
async function main() {
    const name = 'context';
    const context: Context = new Context({
        network: Network.TESTNET,
        rpcProviderUrl: process.env.RPC_PROVIDER
    });

    // Connect the wallet of a document that is a curator.
    const wallet: ContextWallet = await context.wallet(process.env.PRIVATE_KEY); 
    const doc: ContextDocument = await context.clone(name, wallet);

    // Prepare the document. First action : write
    doc.install('core/organization#1.0.0');
    doc.install('core/notifications#1.0.0');
    doc.install('startup/venture#1.0.2');
    doc.pushArray('team', {human:'ctx:cryptobenkei', role:'CEO'});

    // Save: commit.
    let res:any = await doc.commit('Update Document, add schemaas');
    console.log(`Arweave transaction : ${res}`);

    // Update Version: commit.
    res = await doc.push(Version.PATCH);
    console.log(`Version : ${res.version.major}.${res.version.minor}.${res.version.patch}`);
    console.log(`https://testrpc.ctx.xyz/${name}`);
}

main().catch((error) => { console.error(error); });  
