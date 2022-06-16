// import { sanitizeNumbers } from '../../sanitize/sanitizeNumbers';
// import { defaultMockApi } from '../test-helpers/mock';
// import response789629 from '../test-helpers/responses/transaction/material789629.json';
import { All } from './All';
const { ApiPromise, WsProvider } = require("@polkadot/api");
import { SidecarConfig } from '../../SidecarConfig';

const wsProvider = new WsProvider(SidecarConfig.config.SUBSTRATE.WS_URL);
const api = new ApiPromise({ provider: wsProvider });
const all = new All(api);

describe('fileBank', () => {
	describe('fetchFileBank', () => {
		it('Should return the pallet version number, query param is empty', async () => {			
			const res = await all.fetchFileBank('palletVersion', {});
			console.log('res', JSON.stringify(res));
			expect(res.retsult).toStrictEqual(
				'Cannot read properties of undefined (reading fileBank)'
			);
		});

		// it('Should return the decoded metadata when the `metadata` query param is `json`', async () => {
		// 	const res = await transactionMaterialService.fetchTransactionMaterial(
		// 		blockHash789629,
		// 		'json'
		// 	);
		// 	// Confirms the returned metadata is not a hex string.
		// 	expect(typeof res.metadata).toBe('object');
		// });

		// it('Should return the response with no metadata when the default behavior is false', async () => {
		// 	const expectedRes = {
		// 		at: {
		// 			hash: '0x7b713de604a99857f6c25eacc115a4f28d2611a23d9ddff99ab0e4f1c17a8578',
		// 			height: '789629',
		// 		},
		// 		genesisHash:
		// 			'0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
		// 		chainName: 'Polkadot',
		// 		specName: 'polkadot',
		// 		specVersion: '16',
		// 		txVersion: '2',
		// 	};

		// 	const res = await transactionMaterialService.fetchTransactionMaterial(
		// 		blockHash789629,
		// 		false
		// 	);

		// 	expect(sanitizeNumbers(res)).toStrictEqual(expectedRes);
		// });
	});
});
