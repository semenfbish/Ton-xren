import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Test03 } from '../wrappers/Test03';
import '@ton/test-utils';

describe('Test03', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let test03: SandboxContract<Test03>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        test03 = blockchain.openContract(await Test03.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await test03.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: test03.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and test03 are ready to use
    });
});
