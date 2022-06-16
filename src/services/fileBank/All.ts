// import { INodeTransactionPool } from 'src/types/responses';

import { AbstractService } from '../AbstractService';
import { extractCauseAndStack } from './extractCauseAndStack';
import _ from 'lodash';

export class All extends AbstractService {
	async fetchFileBank(eventStr: string, param: any): Promise<any> {
		const { api } = this;
		try {
			await api.isReady;
			let retsult;
			
			let fun = api.query.fileBank[eventStr];
			if (param.id) {
				retsult = await fun(param.id);
				retsult = retsult.toJSON();
			} else if (fun.entries && typeof fun.entries == 'function') {
				if (param && param.id) {
					// console.log('run here 1');
					retsult = await fun(param.id);
					retsult = retsult.toJSON();
				} else {
					// console.log('run here 2');
					retsult = await fun.entries();
					retsult = retsult.map(([key, entry]) => {
						let id = _.get(
							key.args.map((k) => k.toHuman()),
							`0`
						);
						let humanObj = entry.toJSON();
						return _.assign(humanObj, { key: id });
					});
				}
			} else {
				if (param && param.id) {
					// console.log('run here 3');
					retsult = await fun(param.id);
				} else {
					// console.log('run here 4');
					retsult = await fun();
				}
				retsult = retsult.toJSON();
			}
			// console.log('run here 5');
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
