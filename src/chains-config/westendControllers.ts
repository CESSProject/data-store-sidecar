import { ControllerConfig } from '../types/chains-config';
import { initLRUCache } from './cache/lruCache';
import { getBlockWeight } from './metadata-consts';

/**
 * Westend configuration for Sidecar.
 */
export const westendControllers: ControllerConfig = {
	controllers: [
		'AccountsBalanceInfo',
		'AccountsStakingInfo',
		'AccountsStakingPayouts',
		'AccountsValidate',
		'AccountsVestingInfo',
		'Blocks',
		'BlocksExtrinsics',
		'NodeNetwork',
		'NodeTransactionPool',
		'NodeVersion',
		'PalletsStakingProgress',
		'PalletsStorage',
		'Paras',
		'RuntimeCode',
		'RuntimeMetadata',
		'RuntimeSpec',
		'TransactionDryRun',
		'TransactionFeeEstimate',
		'TransactionMaterial',
		'TransactionSubmit',
		'AllMiner',
'Store',
		'All'
	],
	options: {
		finalizes: true,
		minCalcFeeRuntime: 6,
		blockWeightStore: getBlockWeight('westend'),
		blockStore: initLRUCache(),
	},
};
