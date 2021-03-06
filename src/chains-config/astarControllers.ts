import { ControllerConfig } from '../types/chains-config';
import { initLRUCache } from './cache/lruCache';
import { getBlockWeight } from './metadata-consts';

/**
 * Controllers for Astar collator
 */
export const astarControllers: ControllerConfig = {
	controllers: [
		'AccountsBalanceInfo',
		'AccountsVestingInfo',
		'AccountsValidate',
		'Blocks',
		'BlocksExtrinsics',
		'BlocksTrace',
		'NodeNetwork',
		'NodeTransactionPool',
		'NodeVersion',
		'PalletsAssets',
		'PalletsStorage',
		'Paras',
		'RuntimeCode',
		'RuntimeMetadata',
		'RuntimeSpec',
		'TransactionFeeEstimate',
		'TransactionMaterial',
		'TransactionSubmit',
		'AllMiner',
'Store',
		'All'
	],
	options: {
		finalizes: true,
		minCalcFeeRuntime: 1,
		blockWeightStore: getBlockWeight('astar'),
		blockStore: initLRUCache(),
	},
};
