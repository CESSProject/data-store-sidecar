// import { INodeTransactionPool } from 'src/types/responses';

import { ApiPromise } from '@polkadot/api';
import { AbstractService } from '../AbstractService';
import { extractCauseAndStack } from './extractCauseAndStack';
import _ from 'lodash';
import fs from 'fs';
import makeDir from 'make-dir';
import path from 'path';
import { FileStorage } from 'cess-js-sdk';
import { SidecarConfig } from '../../SidecarConfig';
import { ParamsDictionary } from 'express-serve-static-core';

const fileDir = path.join(__dirname, '../../../../public/upload-file/');
makeDir(fileDir).then(() => {}, console.error);

export class Store extends AbstractService {
	storeApi: any;
	constructor(api: ApiPromise) {
		const storeApi = new FileStorage({
			nodeURL: SidecarConfig.config.SUBSTRATE.WS_URL,//'wss://testnet-rpc.cess.cloud/ws/', //SidecarConfig.config.SUBSTRATE.WS_URL,
			keyringOption: { type: 'sr25519', ss58Format: 42 },
		});
		super(api);
		this.storeApi = storeApi;
	}
	async price(): Promise<any> {
		try {
			const retsult = await this.storeApi.findPrice();
			return {
				retsult,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			throw {
				error: 'Unable to fetch findPrice',
				cause,
				stack,
			};
		}
	}
	async purchasedSpace(params: ParamsDictionary): Promise<any> {
		try {
			console.log(params);
			const retsult = await this.storeApi.findPurchasedSpace(
				params.walletAddress
			);
			return {
				retsult,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			throw {
				error: 'Unable to fetch purchasedSpace',
				cause,
				stack,
			};
		}
	}
	async file(params: ParamsDictionary): Promise<any> {
		try {
			console.log(params);
			const retsult = await this.storeApi.findFile(params.fileId);
			return {
				retsult,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			throw {
				error: 'Unable to fetch findFile',
				cause,
				stack,
			};
		}
	}
	async fileList(params: ParamsDictionary): Promise<any> {
		try {
			console.log(params);
			const retsult = await this.storeApi.findFileList(params.walletAddress);
			return {
				retsult,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			throw {
				error: 'Unable to fetch findFile',
				cause,
				stack,
			};
		}
	}
	async delete(params: ParamsDictionary): Promise<any> {
		try {
			const retsult = await this.storeApi.fileDeleteWithTxHash(params.txHash);
			return {
				retsult,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			throw {
				error: 'Unable to fetch findFile',
				cause,
				stack,
			};
		}
	}
	async expansion(params: ParamsDictionary): Promise<any> {
		try {
			const retsult = await this.storeApi.expansionWithTxHash(params.txHash);
			return {
				retsult,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			throw {
				error: 'Unable to fetch findFile',
				cause,
				stack,
			};
		}
	}
	async upload(params: ParamsDictionary): Promise<any> {
		try {
			let filePath = fileDir + params.fileid;
			if (!fs.existsSync(filePath)) {
				throw 'file not found';
			}
			const retsult = await this.storeApi.fileUploadWithTxHash(
				params.txHash,
				filePath,
				params.fileid,
				params.privatekey
			);
			return {
				retsult,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			throw {
				error: 'Unable to fetch upload',
				cause,
				stack,
			};
		}
	}
	async download(params: ParamsDictionary): Promise<any> {
		try {
			const fileId = params.fileId;
			const fileDownPath = await this.storeApi.fileDownload(
				fileId,
				fileDir,
				params.privatekey
			);
			const url = '/upload-file/' + path.basename(fileDownPath);
			return {
				path: fileDownPath,
				url,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			throw {
				error: 'Unable to fetch download',
				cause,
				stack,
			};
		}
	}
	async getDeleteTxHash(params: ParamsDictionary): Promise<any> {
		try {
			const retsult = await this.storeApi.getFileDeleteTxHash(
				params.mnemonic,
				params.fileId
			);
			return {
				retsult,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			throw {
				error: 'Unable to fetch findFile',
				cause,
				stack,
			};
		}
	}
	async getExpansionTxHash(params: ParamsDictionary): Promise<any> {
		try {
			const retsult = await this.storeApi.getExpansionTxHash(
				params.mnemonic,
				params.spaceCount,
				params.leaseCount,
				params.maxPrice
			);
			return {
				retsult,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			throw {
				error: 'Unable to fetch findFile',
				cause,
				stack,
			};
		}
	}
	async getUploadTxHash(params: ParamsDictionary, req: any): Promise<any> {
		try {
			// let fileName = 'a.txt';
			// const fileDir = path.join(__dirname, '../../../file/');
			// await makeDir(fileDir);

			// console.log('fileDir', fileDir);
			console.log('req.fields', req.fields);
			console.log('req.files', req.files);

			// const read = fs.createReadStream(req.files.file.path);
			// fileName=req.files.file.name;
			// const filePath = fileDir + fileName;
			// let write = fs.createWriteStream(filePath);
			// read.pipe(write);

			// fs.writeFileSync(filePath, 'afdsafdsa');
			// return 1;

			let newFilePath = path.dirname(req.files.file.path);
			newFilePath = path.join(newFilePath, '/') + req.files.file.name;
			fs.renameSync(req.files.file.path, newFilePath);
			let retsult = await this.storeApi.getFileUploadTxHash(
				params.mnemonic,
				newFilePath,
				params.backups,
				params.downloadfee,
				params.privatekey
			);
			fs.renameSync(newFilePath, fileDir + retsult.fileid);
			delete retsult.filePath;
			return retsult;
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			throw {
				error: 'Unable to fetch upload',
				cause,
				stack,
			};
		}
	}
}
