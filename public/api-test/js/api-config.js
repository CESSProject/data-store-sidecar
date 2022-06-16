const requestAPI=[
    {
        method: 'get',
        name: 'findPrice',
        fun: 'commonGet',
        url: '/store/find/price',
    },
    {
        method: 'get',
        name: 'findPurchasedSpace',
        fun: 'commonGet',
        url: '/store/find/purchasedSpace',
        avgs: [
            {
                key: 'walletAddress',
                type: 'string',
                value: '',
                must:true
            },
        ],
    },
    {
        method: 'get',
        name: 'findfile',
        fun: 'commonGet',
        url: '/store/find/file/',
        avgs: [
            {
                key: 'fileId',
                type: 'string',
                value: '',
                must:true
            },
        ],
    },
    {
        method: 'get',
        name: 'fileList',
        fun: 'commonGet',
        url: '/store/find/fileList/',
        avgs: [
            {
                key: 'walletAddress',
                type: 'string',
                value: '',
                must:true
            },
        ],
    },
    {
        method: 'post',
        name: 'upload',
        fun: 'commonGet',
        url: '/store/file/upload',
        avgs: [
            {
                key: 'txHash',
                type: 'string',
                value: '',
                must:true
            },
            {
                key: 'fileid',
                type: 'string',
                value: '',
                must:true
            },
            {
                key: 'privatekey',
                type: 'string',
                value: ''
            },
        ],
    },
    {
        method: 'post',
        name: 'download',
        fun: 'commonGet',
        url: '/store/file/download',
        avgs: [
            {
                key: 'fileId',
                type: 'string',
                value: '',
                must:true
            },
            {
                key: 'privatekey',
                type: 'string',
                value: ''
            },
        ],
    },
    {
        method: 'post',
        name: 'delete',
        fun: 'commonGet',
        url: '/store/file/del',
        avgs: [
            {
                key: 'txHash',
                type: 'string',
                value: '',
                must:true
            },
        ],
    },
    {
        method: 'post',
        name: 'expansion（buy space）',
        fun: 'commonGet',
        url: '/store/space/expansion',
        avgs: [
            {
                key: 'txHash',
                type: 'string',
                value: '',
                must:true
            }
        ],
    },
    {
        method: 'post',
        name: 'get public key',
        fun: 'commonGet',
        url: '/store/faucet/publickey',
        avgs: [
            {
                key: 'addr',
                type: 'string',
                value: '',
                must:true
            },
        ],
    },
    {
        method: 'get',
        name: 'addressToEvm',
        fun: 'commonGet',
        url: '/store/converter/addressToEvm',
        avgs: [
            {
                key: 'walletAddress',
                type: 'string',
                value: '',
                must:true
            }
        ],
    },
    {
        method: 'get',
        name: 'evmToAddress',
        fun: 'commonGet',
        url: '/store/converter/evmToAddress',
        avgs: [
            {
                key: 'evm',
                type: 'string',
                value: '',
                must:true
            }
        ],
    }
]

const offlineSingAPI=[    
    {
        method: 'post',
        name: 'upload',
        fun: 'commonGet',
        url: '/store/tx/getUploadTxHash',
        avgs: [
            {
                key: 'mnemonic',
                type: 'string',
                value: '',
                must:true
            },
            {
                key: 'file',
                type: 'file',
                value: '',
                must:true
            },
            {
                key: 'backups',
                type: 'number',
                value: '1',
                must:true
            },
            {
                key: 'downloadfee',
                type: 'number',
                value: '0',
                must:true
            },
            {
                key: 'privatekey',
                type: 'string',
                value: ''
            },
        ],
    },
    {
        method: 'post',
        name: 'delete',
        fun: 'commonGet',
        url: '/store/tx/getDelTxHash',
        avgs: [
            {
                key: 'mnemonic',
                type: 'string',
                value: '',
                must:true
            },
            {
                key: 'fileId',
                type: 'string',
                value: '',
                must:true
            },
        ],
    },
    {
        method: 'post',
        name: 'expansion（buy space）',
        fun: 'commonGet',
        url: '/store/tx/getExpansionTxHash',
        avgs: [
            {
                key: 'mnemonic',
                type: 'string',
                value: '',
                must:true
            },
            {
                key: 'spaceCount',
                type: 'number',
                value: '1',
                must:true
            },
            {
                key: 'leaseCount',
                type: 'number',
                value: '1',
                must:true
            },
            {
                key: 'maxPrice',
                type: 'number',
                value: '0',
                must:true
            },
        ],
    }
]
