// import { INodeTransactionPool } from 'src/types/responses';

import { AbstractService } from '../AbstractService';

export class AllMiner extends AbstractService {
	async fetchMiner(): Promise<any> {
		const { api } = this;

		// const extrinsics = await api.rpc.author.pendingExtrinsics();

		// const pool = extrinsics.map((ext) => {
		// 	return {
		// 		hash: ext.hash.toHex(),
		// 		encodedExtrinsic: ext.toHex(),
		// 	};
		// });

      const entries = await api.query.sminer.minerTable.entries();

		return {
			entries,
		};
	}
}
