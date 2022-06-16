import { All } from './All';
const { ApiPromise, WsProvider } = require("@polkadot/api");
import { SidecarConfig } from '../../SidecarConfig';

const wsProvider = new WsProvider(SidecarConfig.config.SUBSTRATE.WS_URL);
const api = new ApiPromise({ provider: wsProvider });
const all = new All(api);

describe('fileBank', () => {
	describe('fetchFileBank', () => {
		it('Should return the pallet version number, query param is empty', async () => {			
			const res = await all.fetchFileBank('palletVersion', {});
			expect(res.result).toStrictEqual(0);
		});
		it('Should return the unitPrice with u128 number, query param is empty', async () => {			
			const res = await all.fetchFileBank('unitPrice', {});
			expect(typeof res.result).toStrictEqual('number');
		});
		it('Should return the member array, query param is empty', async () => {			
			const res = await all.fetchFileBank('members', {});
			expect(Array.isArray(res.result)).toStrictEqual(true);
		});
		it('Should return the member array, query param is empty', async () => {			
			const res = await all.fetchFileBank('nextUnsignedAt', {});
			expect(typeof res.result).toStrictEqual('number');
		});
	});
});
