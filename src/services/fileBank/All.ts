// import { INodeTransactionPool } from 'src/types/responses';

import { AbstractService } from '../AbstractService';
import { extractCauseAndStack } from './extractCauseAndStack';
import _ from 'lodash';

export class All extends AbstractService {
	async fetchMiner(eventStr: string, param: any): Promise<any> {
		const { api } = this;
		try {
			console.log('eventStr,param', eventStr, param);
			let retsult;
			let fun = api.query.fileBank[eventStr];
			if (param.id) {
				retsult = await fun(param.id);
				retsult = retsult.toJSON();
			}
			else if (fun.entries && typeof fun.entries == 'function') {
				if (param && param.id) {
					console.log('run here 1');
					retsult = await fun(param.id);
					retsult = retsult.toJSON();
				} else {
					console.log('run here 2');
					retsult = await fun.entries();
					retsult = retsult.map(([key, entry]) => {
						let id = _.get(key.args.map((k) => k.toHuman()), `0`);
						let humanObj = entry.toJSON();
						return _.assign(humanObj, { key: id });
					});
				}
			} else {
				if (param && param.id) {
					console.log('run here 3');
					retsult = await fun(param.id);
				} else {
					console.log('run here 4');
					retsult = await fun();
				}
				retsult = retsult.toJSON();
			}
			console.log('run here 5');






			// const extrinsics = await api.rpc.author.pendingExtrinsics();

			// const pool = extrinsics.map((ext) => {
			// 	return {
			// 		hash: ext.hash.toHex(),
			// 		encodedExtrinsic: ext.toHex(),
			// 	};
			// });

			// const MinerKeys = await api.query.sminer.minerTable.keys();
			// const entries = await api.query.sminer.minerTable.entries();
			// const entries = await api.query.sminer.allMiner();
			// console.log(entries.toJSON());
			// let list: any[] = [];
			// entries.forEach(([key, entry]) => {
			// 	// console.log(key.args, 'key arguments:', key.args.map((k) => k.toHuman()), 'rrrrrrrrr', key);
			// 	// console.log('     exposure:', entry.toHuman());

			// 	let minerId = _.get(key.args.map((k) => k.toHuman()), `0`);
			// 	let humanObj = entry.toJSON();
			// 	list.push(_.assign(humanObj, { minerId }));
			// });

			// console.log('***********start************');
			// // const section = api.query['system'];
			// const section = api.query['sminer'];
			// // let result=api.query.system.events.creator.section;
			// let result=Object.keys(section);
			// console.log(result);

			// console.log('***********end************');


			//   const entries = await api.query.sminer.minerTable.entries();

			return {
				retsult,
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
