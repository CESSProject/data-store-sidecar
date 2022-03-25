import { ApiPromise } from '@polkadot/api';
import { RequestHandler } from 'express';

import { All} from '../../services';
import AbstractController from '../AbstractController';


/**
 * GET pending extrinsics from the Substrate node.
 *
 * Returns:
 * - `pool`: array of
 * 		- `hash`: H256 hash of the extrinsic.
 * 		- `encodedExtrinsic`: Scale encoded extrinsic.
 */
export default class AllController extends AbstractController<All> {
	constructor(api: ApiPromise) {
		super(api, '/fileBank/', new All(api));
		this.initRoutes();
	}

	protected initRoutes(): void {
		const { api } = this;
		// this.router.use(this.path, validateAddress);
		// this.safeMountAsyncGetHandlers([['', this.getAllMiner]]);
		let arr:any=Object.keys(api.query['fileBank']).map(t=>{
			let url:string=t;
			return [url, this.getAll];
		});
		arr.push(['file/:id',this.getAll]);
		this.safeMountAsyncGetHandlers(arr);
	}

	/**
	 ** GET pending extrinsics from the Substrate node.
	 *
	 * @param _req Express Request
	 * @param res Express Response
	 */
	private getAll: RequestHandler = async (
		_req,
		res
	): Promise<void> => {
		console.log('***********start************');
		console.log(_req.path);
		let arr:string[]=_req.path.split('/');
		console.log(_req.params);
		console.log(_req.query);
		console.log('***********end************');
		AllController.sanitizedSend(
			res,
			await this.service.fetchMiner(arr[2],_req.params)
		);
	};
}
