import { ControllerConfig } from '../types/chains-config';
import { initLRUCache } from './cache/lruCache';
import { getBlockWeight } from './metadata-consts';

/**
 * Controllers for Dock's test network.
 */
export const dockTestnetControllers: ControllerConfig = {
	controllers: [
		'AccountsBalanceInfo',
		'AccountsStakingInfo',
		'AccountsStakingPayouts',
		'AccountsValidate',
		'Blocks',
		'BlocksExtrinsics',
		'NodeNetwork',
		'NodeTransactionPool',
		'NodeVersion',
		'PalletsStakingProgress',
		'PalletsStorage',
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
		minCalcFeeRuntime: 26,
		blockWeightStore: getBlockWeight('dock-pos-test-runtime'),
		blockStore: initLRUCache(),
	},
};
