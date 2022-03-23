// import { INodeTransactionPool } from 'src/types/responses';

import { AbstractService } from '../AbstractService';
import { extractCauseAndStack } from './extractCauseAndStack';
import _ from "lodash";

export class AllMiner extends AbstractService {
	async fetchMiner(): Promise<any> {
		const { api } = this;
		try {
			// const extrinsics = await api.rpc.author.pendingExtrinsics();

			// const pool = extrinsics.map((ext) => {
			// 	return {
			// 		hash: ext.hash.toHex(),
			// 		encodedExtrinsic: ext.toHex(),
			// 	};
			// });

			// const MinerKeys = await api.query.sminer.minerTable.keys();
			const entries = await api.query.sminer.minerTable.entries();
			let list: any[] = [];
			entries.forEach(([key, entry]) => {
				// console.log(key.args, 'key arguments:', key.args.map((k) => k.toHuman()), 'rrrrrrrrr', key);
				// console.log('     exposure:', entry.toHuman());

				let minerId = _.get(key.args.map((k) => k.toHuman()), `0`);
				let humanObj = entry.toJSON();
				list.push(_.assign(humanObj, { minerId }));
			});


			//   const entries = await api.query.sminer.minerTable.entries();

			return {
				list,
			};

		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			throw {
				error: 'Unable to fetch fee info',
				cause,
				stack,
			};
		}


	}
}
