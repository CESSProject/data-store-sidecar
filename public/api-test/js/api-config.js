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
            },
            {
                key: 'filePath',
                type: 'string',
                value: '',
            },
            {
                key: 'fileid',
                type: 'string',
                value: '',
            },
            {
                key: 'privatekey',
                type: 'string',
                value: '',
            }
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
        name: 'delete',
        fun: 'commonGet',
        url: '/store/file/delete',
        avgs: [
            {
                key: 'txHash',
                type: 'string',
                value: '',
            },
        ],
    },
    {
        method: 'post',
        name: 'expansion',
        fun: 'commonGet',
        url: '/store/space/expansion',
        avgs: [
            {
                key: 'txHash',
                type: 'string',
                value: '',
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
            },
            {
                key: 'file',
                type: 'file',
                value: '',
            },
            {
                key: 'backups',
                type: 'number',
                value: '1',
            },
            {
                key: 'downloadfee',
                type: 'number',
                value: '0',
            },
            {
                key: 'privatekey',
                type: 'string',
                value: '123456',
            }
        ],
    },
    {
        method: 'post',
        name: 'delete',
        fun: 'commonGet',
        url: '/store/tx/getDeleteTxHash',
        avgs: [
            {
                key: 'mnemonic',
                type: 'string',
                value: '',
            },
            {
                key: 'fileId',
                type: 'string',
                value: '',
            },
        ],
    },
    {
        method: 'post',
        name: 'expansion',
        fun: 'commonGet',
        url: '/store/tx/getExpansionTxHash',
        avgs: [
            {
                key: 'mnemonic',
                type: 'string',
                value: '',
            },
            {
                key: 'spaceCount',
                type: 'number',
                value: '1',
            },
            {
                key: 'leaseCount',
                type: 'number',
                value: '1',
            },
            {
                key: 'fileId',
                type: 'number',
                value: '0',
            },
        ],
    }
]
