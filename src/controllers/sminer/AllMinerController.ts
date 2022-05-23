import { ApiPromise } from '@polkadot/api';
import { RequestHandler } from 'express';

import { AllMiner } from '../../services';
import AbstractController from '../AbstractController';

/**
 * GET pending extrinsics from the Substrate node.
 *
 * Returns:
 * - `pool`: array of
 * 		- `hash`: H256 hash of the extrinsic.
 * 		- `encodedExtrinsic`: Scale encoded extrinsic.
 */
export default class AllMinerController extends AbstractController<AllMiner> {
	constructor(api: ApiPromise) {
		super(api, '/sminer/', new AllMiner(api));
		this.initRoutes();
	}

	protected initRoutes(): void {
		const { api } = this;
		// this.router.use(this.path, validateAddress);
		// this.safeMountAsyncGetHandlers([['', this.getAllMiner]]);
		const apis=api.query['sminer'];
		if(!apis) return;
		this.safeMountAsyncGetHandlers(Object.keys(apis).map(t=>{
			let url:string=t;
			if(url=='minerDetails'){
				url+='/:id';
			}
			return [url, this.getAllMiner];
		}));
	}

	/**
	 ** GET pending extrinsics from the Substrate node.
	 *
	 * @param _req Express Request
	 * @param res Express Response
	 */
	private getAllMiner: RequestHandler = async (
		_req,
		res
	): Promise<void> => {
		// console.log('***********start************');
		// console.log(_req.path);
		let arr:string[]=_req.path.split('/');
		// console.log(_req.params);
		// console.log(_req.query);
		// console.log('***********end************');
		AllMinerController.sanitizedSend(
			res,
			await this.service.fetchMiner(arr[2],_req.params)
		);
	};
}
