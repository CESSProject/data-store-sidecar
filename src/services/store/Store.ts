// import { INodeTransactionPool } from 'src/types/responses';

import { ApiPromise } from '@polkadot/api';
import { AbstractService } from '../AbstractService';
import { extractCauseAndStack } from './extractCauseAndStack';
import _ from 'lodash';
import fs from 'fs';
import makeDir from 'make-dir';
import path from 'path';
import { FileStorage, DataStorage, Converter } from 'cess-js-sdk';
import { SidecarConfig } from '../../SidecarConfig';
import { ParamsDictionary } from 'express-serve-static-core';

const fileDir = path.join(__dirname, '../../../../public/upload-file/');
makeDir(fileDir).then(() => {}, console.error);

export class Store extends AbstractService {
	storeApi: any;
	storeApiForTX: any;
	constructor(api: ApiPromise) {
		const storeApi = new FileStorage({
			nodeURL: SidecarConfig.config.SUBSTRATE.WS_URL, //'wss://testnet-rpc.cess.cloud/ws/', //SidecarConfig.config.SUBSTRATE.WS_URL,
			keyringOption: { type: 'sr25519', ss58Format: 42 },
			debug: true,
		});
		super(api);
		this.storeApi = storeApi;

		const storeApiForTX = new DataStorage({
			nodeURL: 'ws://106.15.44.155:9949/', //'wss://example-datastore.cess.cloud/ws/', //'ws://106.15.44.155:9948', //'wss://testnet-rpc.cess.cloud/ws/', //SidecarConfig.config.SUBSTRATE.WS_URL,
			keyringOption: { type: 'sr25519', ss58Format: 42 },
			debug: true,
		});
		this.storeApiForTX = storeApiForTX;
	}
	async price(): Promise<any> {
		let result: any = null;
		try {
			const price = await this.storeApi.findPrice();
			result = {
				msg: 'ok',
				data: price,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async purchasedSpace(params: ParamsDictionary): Promise<any> {
		let result: any = null;
		try {
			if (!params.walletAddress) {
				throw 'walletAddress is required.';
			}
			const data = await this.storeApi.findPurchasedSpace(params.walletAddress);
			result = {
				msg: 'ok',
				data,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async file(params: ParamsDictionary): Promise<any> {
		let result: any = null;
		try {
			if (!params.fileId) {
				throw 'fileId is required.';
			}
			const data = await this.storeApi.findFile(params.fileId);
			result = {
				msg: 'ok',
				data,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async fileList(params: ParamsDictionary): Promise<any> {
		let result: any = null;
		try {
			if (!params.walletAddress) {
				throw 'walletAddress is required.';
			}
			const data = await this.storeApi.findFileList(params.walletAddress);
			result = {
				msg: 'ok',
				data,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async del(params: ParamsDictionary): Promise<any> {
		let result: any = null;
		try {
			if (!params.txHash) {
				throw 'txHash is required.';
			}
			const data = await this.storeApi.fileDeleteWithTxHash(params.txHash);
			result = {
				msg: 'ok',
				data,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async expansion(params: ParamsDictionary): Promise<any> {
		let result: any = null;
		try {
			if (!params.txHash) {
				throw 'txHash is required.';
			}
			const data = await this.storeApi.expansionWithTxHash(params.txHash);
			result = {
				msg: 'ok',
				data,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async upload(params: ParamsDictionary): Promise<any> {
		let result: any = null;
		try {
			if (!params) {
				throw 'params is required.';
			}
			if (!params.txHash) {
				throw 'txHash is required.';
			}
			if (!params.fileid) {
				throw 'fileid is required.';
			}
			let filePath = fileDir + params.fileid;
			if (!fs.existsSync(filePath)) {
				throw 'file not found';
			}
			this.storeApi
				.fileUploadWithTxHash(
					params.txHash,
					filePath,
					params.fileid,
					params.privatekey
				)
				.then(console.log, console.log);
			result = {
				msg: 'pending',
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async download(params: ParamsDictionary): Promise<any> {
		let result: any = null;
		try {
			const fileId = params.fileId;
			global[fileId] = null;
			this.storeApi
				.fileDownload(fileId, fileDir, params.privatekey)
				.then(console.log, console.log);			
			result = {
				msg: 'pending',
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async getDelTxHash(params: ParamsDictionary): Promise<any> {
		let result: any = null;
		try {
			const data = await this.storeApi.getFileDeleteTxHash(
				params.mnemonic,
				params.fileId
			);
			result = {
				msg: 'ok',
				data,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async getExpansionTxHash(params: ParamsDictionary): Promise<any> {
		let result: any = null;
		try {
			const data = await this.storeApi.getExpansionTxHash(
				params.mnemonic,
				params.spaceCount,
				params.leaseCount,
				params.maxPrice
			);
			result = {
				msg: 'ok',
				data,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async getUploadTxHash(params: ParamsDictionary, req: any): Promise<any> {
		let result: any = null;
		try {
			let newFilePath = path.dirname(req.files.file.path);
			// console.log('newFilePath',newFilePath);
			newFilePath = path.join(newFilePath, './') + req.files.file.name;
			// console.log('newFilePath',newFilePath);
			if (req.files.file.path != newFilePath) {
				// console.log('req.files.file.path != newFilePath',req.files.file.path);
				fs.renameSync(req.files.file.path, newFilePath);
			}
			let data = await this.storeApi.getFileUploadTxHash(
				params.mnemonic,
				newFilePath,
				parseInt(params.backups),
				parseInt(params.downloadfee),
				null,
				params.privatekey
			);
			fs.renameSync(newFilePath, fileDir + data.fileid);
			result = {
				msg: 'ok',
				data,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async publickey(params: ParamsDictionary): Promise<any> {
		let result: any = null;
		try {
			if (!params.addr) {
				throw 'addr is required.';
			}
			const pair = this.storeApi.keyring.addFromAddress(params.addr);
			const data =
				'0x' +
				Array.from(pair.publicKey, (i: any) =>
					i.toString(16).padStart(2, '0')
				).join('');
			result = {
				msg: 'ok',
				data,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}

	// 0.3
	async getStoreTxHash(params: ParamsDictionary, req: any): Promise<any> {
		let result: any = null;
		try {
			let keywords = params.keywords || req.files.file.name;
			let newFilePath = path.dirname(req.files.file.path);
			newFilePath = path.join(newFilePath, './') + req.files.file.name;
			if (req.files.file.path != newFilePath) {
				fs.renameSync(req.files.file.path, newFilePath);
			}
			let resultUpload = await this.storeApi.getFileUploadTxHash(
				params.mnemonic,
				newFilePath,
				1,
				0
			);
			let resultForTX = await this.storeApiForTX.getStoreTxHash(
				params.mnemonic,
				newFilePath,
				resultUpload.fileid,
				keywords.split(',')
			);
			fs.renameSync(newFilePath, fileDir + resultUpload.fileid);
			delete resultUpload.filePath;
			delete resultForTX.filePath; //resultUpload, resultForTX
			result = {
				msg: 'ok',
				data: {
					txHashUpload: resultUpload.txHash,
					txHashStore: resultForTX.txHash,
					fileid: resultUpload.fileid,
				},
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async getRetrieveTxHash(params: ParamsDictionary): Promise<any> {
		let result: any = null;
		try {
			//wss://example-datastore.cess.cloud/ws/
			const fileId = params.fileId;
			const mnemonic = params.mnemonic;
			const ret = await this.storeApiForTX.getRetrieveTxHash(mnemonic, fileId);
			console.log('ret', ret);
			result = {
				msg: 'ok',
				data: { fileid: fileId, txHash: ret.txHash },
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async getReplaceTxHash(params: ParamsDictionary, req: any): Promise<any> {
		let result: any = null;
		try {
			let keywords = params.keywords || req.files.file.name;
			const oldFileId = params.oldFileId;
			let newFilePath = path.dirname(req.files.file.path);
			newFilePath = path.join(newFilePath, './') + req.files.file.name;
			if (req.files.file.path != newFilePath) {
				fs.renameSync(req.files.file.path, newFilePath);
			}
			// const txHashDel = await this.storeApi.getFileDeleteTxHash(
			// 	params.mnemonic,
			// 	oldFileId
			// );
			let resultUpload = await this.storeApi.getFileUploadTxHash(
				params.mnemonic,
				newFilePath,
				1,
				0
			);
			let resultReplace = await this.storeApiForTX.getReplaceTxHash(
				params.mnemonic,
				newFilePath,
				resultUpload.fileid,
				keywords.split(',')
			);
			fs.renameSync(newFilePath, fileDir + resultUpload.fileid);
			result = {
				msg: 'ok',
				data: {
					txHashUpload: resultUpload.txHash,
					txHashReplace: resultReplace.txHash,
					oldFileId,
					newFileId: resultUpload.fileid,
				},
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async getDeleteTxHash(params: ParamsDictionary): Promise<any> {
		let result: any = null;
		try {
			const fileId = params.fileId;
			const mnemonic = params.mnemonic;
			const txHash = await this.storeApi.getFileDeleteTxHash(
				params.mnemonic,
				params.fileId
			);
			const txResult = await this.storeApiForTX.getDeleteTxHash(
				mnemonic,
				fileId
			);
			result = {
				msg: 'ok',
				data: { fileid: fileId, txHash, txHash2: txResult.txHash },
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async store(params: ParamsDictionary): Promise<any> {
		let result: any = null;
		try {
			if (!params.fileid) {
				throw 'fileid not found';
			}
			let filePath = fileDir + params.fileid;
			if (!fs.existsSync(filePath)) {
				throw 'file not found';
			}
			const data = await this.storeApi.fileUploadWithTxHash(
				params.txHashUpload,
				filePath,
				params.fileid
			);
			const dataTX = await this.storeApiForTX.submitTransaction(
				params.txHashStore
			);
			result = {
				msg: 'ok',
				data,
				dataTX,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async retrieve(params: ParamsDictionary): Promise<any> {
		let result: any = null;
		try {
			const fileId = params.fileid;
			const txHash = params.txHash;
			await this.storeApiForTX.submitTransaction(txHash);
			const fileDownPath = await this.storeApi.fileDownload(fileId, fileDir);
			const url = '/upload-file/' + path.basename(fileDownPath);
			result = {
				msg: 'ok',
				data: {
					path: fileDownPath,
					url,
				},
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async replace(params: ParamsDictionary): Promise<any> {
		let result: any = null;
		const that = this;
		try {
			// txHashDel: resultDelete.txHash,
			// txHashUpload: resultUpload.txHash,
			// txHashReplace: resultReplace.txHash,
			// oldFileId,
			// newFileId: resultReplace.fileId,
			if (!params.txHashReplace) {
				throw 'txHashReplace is required.';
			}
			if (!params.txHashUpload) {
				throw 'txHashUpload is required.';
			}
			let filePath = fileDir + params.newFileId;
			if (!fs.existsSync(filePath)) {
				throw 'file not found';
			}
			let replaceResult: any = null;
			let uploadResult: any = null;

			try {
				replaceResult = await this.storeApiForTX.submitTransaction(
					params.txHashReplace
				);
			} catch (e) {
				console.log('replaceResult');
				console.log(e);
			}
			try {
				uploadResult = await that.storeApi.fileUploadWithTxHash(
					params.txHashUpload,
					filePath,
					params.newFileId
				);
			} catch (e) {
				console.log('uploadResult');
				console.log(e);
			}

			result = {
				msg: 'ok',
				data: {
					newFileId: params.newFileId,
					replaceResult,
					uploadResult,
				},
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	async delete(params: ParamsDictionary): Promise<any> {
		let result: any = null;
		try {
			if (!params.txHash) {
				throw 'txHash is required.';
			}
			const data1 = await this.storeApi.fileDeleteWithTxHash(params.txHash);
			const data2 = await this.storeApiForTX.submitTransaction(params.txHash2);
			result = {
				msg: 'ok',
				data: {
					data1,
					data2,
				},
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}

	addressToEvm(params: ParamsDictionary): any {
		let result: any = null;
		try {
			if (!params.walletAddress) {
				throw 'walletAddress is required.';
			}
			const data = Converter.addressToEvm(params.walletAddress);
			result = {
				msg: 'ok',
				data,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
	evmToAddress(params: ParamsDictionary): any {
		let result: any = null;
		try {
			if (!params.evm) {
				throw 'evm is required.';
			}
			const data = Converter.evmToAddress(params.evm);
			result = {
				msg: 'ok',
				data,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}

	progress(params: ParamsDictionary): any {
		let result: any = null;
		try {
			if (!params.progressId) {
				throw 'progressId is required.';
			}
			result = global[params.progressId];
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			result = {
				msg: cause,
				data: stack,
			};
		}
		return result;
	}
}
