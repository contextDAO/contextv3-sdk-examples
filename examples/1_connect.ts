import { Context } from '@contextdao/sdk';


async function main() {
    const context = new Context();
    let data = await context.read('context');
    console.log(data);
    data = await context.read('alex');
    console.log(data);
}

main().catch((error) => { console.error(error); });  
