const requestAPI=[
    {
        method: 'post',
        name: 'store',
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
        url: '/store/file/delete',
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
        url: '/store/tx/getDeleteTxHash',
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
