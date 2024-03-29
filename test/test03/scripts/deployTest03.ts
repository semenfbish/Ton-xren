import { toNano } from '@ton/core';
import { Test03 } from '../wrappers/Test03';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const test03 = provider.open(await Test03.fromInit(23424n));

    await test03.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(test03.address);

    // run methods on `test03`
}

