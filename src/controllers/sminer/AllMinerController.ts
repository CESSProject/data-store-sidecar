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
		super(api, '/sminer/allMiner', new AllMiner(api));
		this.initRoutes();
	}

	protected initRoutes(): void {
		this.safeMountAsyncGetHandlers([['', this.getAllMiner]]);
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
		AllMinerController.sanitizedSend(
			res,
			await this.service.fetchMiner()
		);
	};
}
