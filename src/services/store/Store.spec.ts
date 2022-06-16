import { Store } from './Store';
import { join } from 'path';
import fs from 'fs';
const { ApiPromise, WsProvider } = require('@polkadot/api');
import { SidecarConfig } from '../../SidecarConfig';

const wsProvider = new WsProvider(SidecarConfig.config.SUBSTRATE.WS_URL);
const api = new ApiPromise({ provider: wsProvider });
const store = new Store(api);

const walletAddress: string =
	'cXh5StobuVP4B7mGH9xn8dSsDtXks4qLAou8ZdkZ6DbB6zzxe';

const mnemonic =
	'denial empower wear venue distance leopard lamp source off other twelve permit';

describe('store', () => {
	it('price', async () => {
		const res = await store.price();
		expect(typeof res.result).toStrictEqual('number');
	});
	it('purchasedSpace', async () => {
		const res = await store.purchasedSpace({ walletAddress });
		expect(
			res.result &&
				typeof res.result.purchasedSpace &&
				typeof res.result.purchasedSpace == 'number'
		).toBe(true);
	});
	it('fileList and file ', async () => {
		let answer = true;
		const { result } = await store.fileList({ walletAddress });
		if (Array.isArray(result)) {
			if (result.length > 0) {
				const fileId = result[0];
				const res = await store.file({ fileId });
				if (!res.result || !res.result.fileName) {
					answer = false;
				}
			}
		} else {
			answer = false;
		}
		expect(answer).toBe(true);
	});
	it('del', async () => {
		const res = await store.getDelTxHash({
			mnemonic,
			fileId: 'dYHdtLNoqzJsrMn7dETwDG',
		});
		expect(typeof res.result).toBe('string');
	});
	it('expansion（buy space）', async () => {
		const res = await store.getExpansionTxHash({
			mnemonic,
			spaceCount: '1',
			leaseCount: '1',
			maxPrice: '0',
		});
		const txRes = await store.del({
			txHash: res.result,
		});
		expect(typeof txRes.result).toBe('string');
	});
	it('upload', async () => {
		const fileDir = join(__dirname, './');
		const fileName = 'tmpfile.txt';
		const fullPath = fileDir + fileName;
		if (!fs.existsSync(fullPath)) {
			fs.writeFileSync(fullPath, 'for test');
		}
		const req = {
			files: {
				file: {
					path: fullPath,
					name: fileName,
				},
			},
		};
		const res = await store.getUploadTxHash(
			{
				mnemonic,
				backups: '1',
				downloadfee: '1',
				privatekey: '123456',
			},
			req
		);
		// const txRes = await store.upload(res.result);
		expect(typeof res.result.txHash).toBe('string');
	});
	it('download ', async () => {
		const res = await store.download({
			fileId: 'qKCUTFNjpiecM2QNL9SHpD',
			privatekey: '123456',
		});
		expect(typeof res.path).toBe('string');
	});

	it('publickey ', async () => {
		const res = await store.publickey({
			addr: walletAddress,
		});
		expect(typeof res.result).toBe('string');
	});
});
