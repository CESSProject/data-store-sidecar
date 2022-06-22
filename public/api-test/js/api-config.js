const requestAPI = [
	{
		method: 'get',
		group: 'fileBank',
		name: 'findPrice',
		fun: 'commonGet',
		url: '/store/find/price',
	},
	{
		method: 'get',
		group: 'fileBank',
		name: 'findPurchasedSpace',
		fun: 'commonGet',
		url: '/store/find/purchasedSpace',
		avgs: [
			{
				key: 'walletAddress',
				type: 'string',
				value: '',
				must: true,
			},
		],
	},
	{
		method: 'get',
		group: 'fileBank',
		name: 'findfile',
		fun: 'commonGet',
		url: '/store/find/file/',
		avgs: [
			{
				key: 'fileId',
				type: 'string',
				value: '',
				must: true,
			},
		],
	},
	{
		method: 'get',
		group: 'fileBank',
		name: 'fileList',
		fun: 'commonGet',
		url: '/store/find/fileList/',
		avgs: [
			{
				key: 'walletAddress',
				type: 'string',
				value: '',
				must: true,
			},
		],
	},
	{
		method: 'post',
		group: 'fileBank',
		name: 'upload',
		fun: 'commonGet',
		url: '/store/file/upload',
		avgs: [
			{
				key: 'txHash',
				type: 'string',
				value: '',
				must: true,
			},
			{
				key: 'fileid',
				type: 'string',
				value: '',
				must: true,
			},
			{
				key: 'privatekey',
				type: 'string',
				value: '',
			},
		],
	},
	{
		method: 'post',
		group: 'fileBank',
		name: 'download',
		fun: 'commonGet',
		url: '/store/file/download',
		avgs: [
			{
				key: 'fileId',
				type: 'string',
				value: '',
				must: true,
			},
			{
				key: 'privatekey',
				type: 'string',
				value: '',
			},
		],
	},
	{
		method: 'post',
		group: 'fileBank',
		name: 'delete',
		fun: 'commonGet',
		url: '/store/file/del',
		avgs: [
			{
				key: 'txHash',
				type: 'string',
				value: '',
				must: true,
			},
		],
	},
	{
		method: 'post',
		group: 'fileBank',
		name: 'expansion（buy space）',
		fun: 'commonGet',
		url: '/store/space/expansion',
		avgs: [
			{
				key: 'txHash',
				type: 'string',
				value: '',
				must: true,
			},
		],
	},
	{
		method: 'post',
		group: 'fileBank',
		name: 'get public key',
		fun: 'commonGet',
		url: '/store/faucet/publickey',
		avgs: [
			{
				key: 'addr',
				type: 'string',
				value: '',
				must: true,
			},
		],
	},
	{
		method: 'get',
		group: 'fileBank',
		name: 'addressToEvm',
		fun: 'commonGet',
		url: '/store/converter/addressToEvm',
		avgs: [
			{
				key: 'walletAddress',
				type: 'string',
				value: '',
				must: true,
			},
		],
	},
	{
		method: 'get',
		group: 'fileBank',
		name: 'evmToAddress',
		fun: 'commonGet',
		url: '/store/converter/evmToAddress',
		avgs: [
			{
				key: 'evm',
				type: 'string',
				value: '',
				must: true,
			},
		],
	},
	{
		method: 'post',
		group: 'store',
		name: 'store',
		fun: 'commonGet',
		url: '/store/datastore/store',
		avgs: [
			{
				key: 'txHashUpload',
				type: 'string',
				value: '',
				must: true,
			},
			{
				key: 'txHashStore',
				type: 'string',
				value: '',
				must: true,
			},
			{
				key: 'fileid',
				type: 'string',
				value: '',
				must: true,
			},
		],
	},
	{
		method: 'post',
		group: 'store',
		name: 'retrieve',
		fun: 'commonGet',
		url: '/store/datastore/retrieve',
		avgs: [
			{
				key: 'txHash',
				type: 'string',
				value: '',
				must: true,
			},
			{
				key: 'fileid',
				type: 'string',
				value: '',
				must: true,
			},
		],
	},
	{
		method: 'post',
		group: 'store',
		name: 'replace',
		fun: 'commonGet',
		url: '/store/datastore/replace',
		avgs: [
			{
				key: 'txHashReplace',
				type: 'string',
				value: '',
				must: true,
			},
			{
				key: 'txHashUpload',
				type: 'string',
				value: '',
				must: true,
			},
			{
				key: 'newFileId',
				type: 'string',
				value: '',
				must: true,
			},
		],
	},
	{
		method: 'post',
		group: 'store',
		name: 'delete',
		fun: 'commonGet',
		url: '/store/datastore/delete',
		avgs: [
			{
				key: 'txHash',
				type: 'string',
				value: '',
				must: true,
			},
			{
				key: 'txHash2',
				type: 'string',
				value: '',
				must: true,
			},
		],
	},
];

const offlineSingAPI = [
	{
		method: 'post',
		group: 'fileBank',
		name: 'upload',
		fun: 'commonGet',
		url: '/store/tx/getUploadTxHash',
		avgs: [
			{
				key: 'mnemonic',
				type: 'string',
				value: '',
				must: true,
			},
			{
				key: 'file',
				type: 'file',
				value: '',
				must: true,
			},
			{
				key: 'backups',
				type: 'number',
				value: '1',
				must: true,
			},
			{
				key: 'downloadfee',
				type: 'number',
				value: '0',
				must: true,
			},
			{
				key: 'privatekey',
				type: 'string',
				value: '',
			},
		],
	},
	{
		method: 'post',
		group: 'fileBank',
		name: 'delete',
		fun: 'commonGet',
		url: '/store/tx/getDelTxHash',
		avgs: [
			{
				key: 'mnemonic',
				type: 'string',
				value: '',
				must: true,
			},
			{
				key: 'fileId',
				type: 'string',
				value: '',
				must: true,
			},
		],
	},
	{
		method: 'post',
		group: 'fileBank',
		name: 'expansion（buy space）',
		fun: 'commonGet',
		url: '/store/tx/getExpansionTxHash',
		avgs: [
			{
				key: 'mnemonic',
				type: 'string',
				value: '',
				must: true,
			},
			{
				key: 'spaceCount',
				type: 'number',
				value: '1',
				must: true,
			},
			{
				key: 'leaseCount',
				type: 'number',
				value: '1',
				must: true,
			},
			{
				key: 'maxPrice',
				type: 'number',
				value: '0',
				must: true,
			},
		],
	},
	{
		method: 'post',
		group: 'store',
		name: 'store',
		fun: 'commonGet',
		url: '/store/datastore/getStoreTxHash',
		avgs: [
			{
				key: 'mnemonic',
				type: 'string',
				value: '',
				must: true,
			},
			{
				key: 'file',
				type: 'file',
				value: '',
				must: true,
			},
			{
				key: 'keywords',
				type: 'string',
				value: '',
			},
		],
	},
	{
		method: 'post',
		group: 'store',
		name: 'retrieve',
		fun: 'commonGet',
		url: '/store/datastore/getRetrieveTxHash',
		avgs: [
			{
				key: 'mnemonic',
				type: 'string',
				value: '',
				must: true,
			},
			{
				key: 'fileId',
				type: 'string',
				value: '',
				must: true,
			},
		],
	},
	{
		method: 'post',
		group: 'store',
		name: 'replace',
		fun: 'commonGet',
		url: '/store/datastore/getReplaceTxHash',
		avgs: [
			{
				key: 'mnemonic',
				type: 'string',
				value: '',
				must: true,
			},
			{
				key: 'file',
				type: 'file',
				value: '',
				must: true,
			},
			{
				key: 'oldFileId',
				type: 'string',
				value: '',
				must: true,
			},
			{
				key: 'keywords',
				type: 'string',
				value: '',
			},
		],
	},
	{
		method: 'post',
		group: 'store',
		name: 'delete',
		fun: 'commonGet',
		url: '/store/datastore/getDeleteTxHash',
		avgs: [
			{
				key: 'mnemonic',
				type: 'string',
				value: '',
				must: true,
			},
			{
				key: 'fileId',
				type: 'string',
				value: '',
				must: true,
			},
		],
	},
];
