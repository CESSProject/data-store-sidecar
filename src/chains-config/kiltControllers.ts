import { ControllerConfig } from '../types/chains-config';
import { initLRUCache } from './cache/lruCache';

/**
 * Controllers for KILT's mashnet.
 */
export const kiltControllers: ControllerConfig = {
	controllers: [
		'AccountsBalanceInfo',
		'AccountsStakingInfo',
		'AccountsValidate',
		'Blocks',
		'BlocksExtrinsics',
		'NodeNetwork',
		'NodeTransactionPool',
		'NodeVersion',
		'PalletsStorage',
		'RuntimeCode',
		'RuntimeSpec',
		'RuntimeMetadata',
		'TransactionDryRun',
		'TransactionMaterial',
		'TransactionFeeEstimate',
		'TransactionSubmit',
		'AllMiner',
'Store',
		'All'
	],
	options: {
		finalizes: true,
		minCalcFeeRuntime: null,
		blockWeightStore: {},
		blockStore: initLRUCache(),
	},
};
