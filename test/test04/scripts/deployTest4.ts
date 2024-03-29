import { toNano } from '@ton/core';
import { Test4 } from '../wrappers/Test4';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const test4 = provider.open(await Test4.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await test4.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(test4.address);

    console.log('ID', await test4.getId());
}
