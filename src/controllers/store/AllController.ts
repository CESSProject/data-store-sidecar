import { ApiPromise } from '@polkadot/api';
import { RequestHandler } from 'express';

import { Store } from '../../services';
import AbstractController from '../AbstractController';

/**
 * GET pending extrinsics from the Substrate node.
 *
 * Returns:
 * - `pool`: array of
 * 		- `hash`: H256 hash of the extrinsic.
 * 		- `encodedExtrinsic`: Scale encoded extrinsic.
 */
export default class AllController extends AbstractController<Store> {
	constructor(api: ApiPromise) {
		super(api, '/store/', new Store(api));
		this.initRoutes();
	}

	protected initRoutes(): void {
		const arr: any = [];
		arr.push(['find/price', this.getAll]);
		arr.push(['find/purchasedSpace/:walletAddress', this.getAll]);
		arr.push(['find/file/:fileId', this.getAll]);
		arr.push(['find/fileList/:walletAddress', this.getAll]);

		arr.push(['find/purchasedSpace', this.getAll]);
		arr.push(['find/file', this.getAll]);
		arr.push(['find/fileList', this.getAll]);
		this.safeMountAsyncGetHandlers(arr);

		const arrPost: any = [];
		arrPost.push(['file/upload', this.postAll]);
		arrPost.push(['file/download', this.postAll]);
		arrPost.push(['file/delete', this.postAll]);
		arrPost.push(['space/expansion', this.postAll]);
		this.safeMountAsyncPostHandlers(arrPost);
	}

	/**
	 ** GET pending extrinsics from the Substrate node.
	 *
	 * @param _req Express Request
	 * @param res Express Response
	 */
	private getAll: RequestHandler = async (_req, res): Promise<void> => {
		console.log('***********start************');
		// console.log(_req.path);
		const arr: string[] = _req.path.split('/');
		let params:any=_req.params;
		console.log(_req.params);
		if(Object.keys(_req.params).length==0){
			params=_req.query;
		}
		console.log(_req.query);
		console.log('***********end************');
		// console.log(arr);
		const funName = arr[3];
		// console.log(funName);
		AllController.sanitizedSend(res, await this.service[funName](params));
	};
	/**
	 ** Post pending extrinsics from the Substrate node.
	 *
	 * @param _req Express Request
	 * @param res Express Response
	 */
	private postAll: RequestHandler = async (_req, res): Promise<void> => {
		console.log('***********start************');
		console.log('path=', _req.path);
		const arr: string[] = _req.path.split('/');
		const funName = arr[3];


		let params:any=_req.body;
		if(Object.keys(params).length==0){
			params=_req.fields;
		}
		console.log('body', _req.body);
		console.log('fields', _req.fields);
		console.log('funName', funName);
		console.log('***********end************');
		AllController.sanitizedSend(res, await this.service[funName](params,_req));
	};
}
