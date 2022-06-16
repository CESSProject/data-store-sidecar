// import { INodeTransactionPool } from 'src/types/responses';

import { ApiPromise } from '@polkadot/api';
import { AbstractService } from '../AbstractService';
import { extractCauseAndStack } from './extractCauseAndStack';
import _ from 'lodash';
import fs from 'fs';
import makeDir from 'make-dir';
import path from 'path';
import { FileStorage, Converter } from 'cess-js-sdk';
import { SidecarConfig } from '../../SidecarConfig';
import { ParamsDictionary } from 'express-serve-static-core';

const fileDir = path.join(__dirname, '../../../../public/upload-file/');
makeDir(fileDir).then(() => {}, console.error);

export class Store extends AbstractService {
	storeApi: any;
	constructor(api: ApiPromise) {
		const storeApi = new FileStorage({
			nodeURL: SidecarConfig.config.SUBSTRATE.WS_URL, //'wss://testnet-rpc.cess.cloud/ws/', //SidecarConfig.config.SUBSTRATE.WS_URL,
			keyringOption: { type: 'sr25519', ss58Format: 42 },
		});
		super(api);
		this.storeApi = storeApi;
	}
	async price(): Promise<any> {
		try {
			const result = await this.storeApi.findPrice();
			return {
				result,
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
			if (!params.walletAddress) {
				throw 'walletAddress is required.';
			}
			const result = await this.storeApi.findPurchasedSpace(
				params.walletAddress
			);
			return {
				result,
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
			if (!params.fileId) {
				throw 'fileId is required.';
			}
			const result = await this.storeApi.findFile(params.fileId);
			return {
				result,
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
			
			if (!params.walletAddress) {
				throw 'walletAddress is required.';
			}
			const result = await this.storeApi.findFileList(params.walletAddress);
			return {
				result,
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
	async del(params: ParamsDictionary): Promise<any> {
		try {
			if (!params.txHash) {
				throw 'txHash is required.';
			}
			const result = await this.storeApi.fileDeleteWithTxHash(params.txHash);
			return {
				result,
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
			if (!params.txHash) {
				throw 'txHash is required.';
			}
			const result = await this.storeApi.expansionWithTxHash(params.txHash);
			return {
				result,
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
			const result = await this.storeApi.fileUploadWithTxHash(
				params.txHash,
				filePath,
				params.fileid,
				params.privatekey
			);
			return {
				result,
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
	async getDelTxHash(params: ParamsDictionary): Promise<any> {
		try {
			const result = await this.storeApi.getFileDeleteTxHash(
				params.mnemonic,
				params.fileId
			);
			return {
				result,
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
			const result = await this.storeApi.getExpansionTxHash(
				params.mnemonic,
				params.spaceCount,
				params.leaseCount,
				params.maxPrice
			);
			return {
				result,
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
			let newFilePath = path.dirname(req.files.file.path);
			newFilePath = path.join(newFilePath, './') + req.files.file.name;
			if (req.files.file.path != newFilePath) {
				fs.renameSync(req.files.file.path, newFilePath);
			}
			let result = await this.storeApi.getFileUploadTxHash(
				params.mnemonic,
				newFilePath,
				parseInt(params.backups),
				parseInt(params.downloadfee),
				params.privatekey
			);
			fs.renameSync(newFilePath, fileDir + result.fileid);
			delete result.filePath;
			return { result };
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			throw {
				error: 'Unable to fetch getUploadTxHash',
				cause,
				stack,
			};
		}
	}
	async publickey(params: ParamsDictionary): Promise<any> {
		try {
			if (!params.addr) {
				throw 'addr is required.';
			}
			const pair = this.storeApi.keyring.addFromAddress(params.addr);
			const result =
				'0x' +
				Array.from(pair.publicKey, (i: any) =>
					i.toString(16).padStart(2, '0')
				).join('');
			return { result };
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);
			throw {
				error: 'Unable to fetch findFile',
				cause,
				stack,
			};
		}
	}

	// 0.3
	// async getStoreTxHash(params: ParamsDictionary, req: any): Promise<any> {
	// 	try {
	// 		let newFilePath = path.dirname(req.files.file.path);
	// 		newFilePath = path.join(newFilePath, '/') + req.files.file.name;
	// 		fs.renameSync(req.files.file.path, newFilePath);
	// 		let result = await this.storeApi.getFileUploadTxHash(
	// 			params.mnemonic,
	// 			newFilePath,
	// 			params.backups,
	// 			params.downloadfee,
	// 			params.privatekey
	// 		);
	// 		fs.renameSync(newFilePath, fileDir + result.fileid);
	// 		delete result.filePath;
	// 		return result;
	// 	} catch (err) {
	// 		const { cause, stack } = extractCauseAndStack(err);
	// 		throw {
	// 			error: 'Unable to fetch upload',
	// 			cause,
	// 			stack,
	// 		};
	// 	}
	// }
	// async getRetrieveTxHash(params: ParamsDictionary): Promise<any> {
	// 	try {
	// 		const result = await this.storeApi.getFileDeleteTxHash(
	// 			params.mnemonic,
	// 			params.fileId
	// 		);
	// 		return {
	// 			result,
	// 		};
	// 	} catch (err) {
	// 		const { cause, stack } = extractCauseAndStack(err);
	// 		throw {
	// 			error: 'Unable to fetch findFile',
	// 			cause,
	// 			stack,
	// 		};
	// 	}
	// }
	// async getReplaceTxHash(params: ParamsDictionary): Promise<any> {
	// 	try {
	// 		const result = await this.storeApi.getExpansionTxHash(
	// 			params.mnemonic,
	// 			params.spaceCount,
	// 			params.leaseCount,
	// 			params.maxPrice
	// 		);
	// 		return {
	// 			result,
	// 		};
	// 	} catch (err) {
	// 		const { cause, stack } = extractCauseAndStack(err);
	// 		throw {
	// 			error: 'Unable to fetch findFile',
	// 			cause,
	// 			stack,
	// 		};
	// 	}
	// }
	// async getDeleteTxHash(params: ParamsDictionary, req: any): Promise<any> {
	// 	try {
	// 		let newFilePath = path.dirname(req.files.file.path);
	// 		newFilePath = path.join(newFilePath, '/') + req.files.file.name;
	// 		fs.renameSync(req.files.file.path, newFilePath);
	// 		let result = await this.storeApi.getFileUploadTxHash(
	// 			params.mnemonic,
	// 			newFilePath,
	// 			params.backups,
	// 			params.downloadfee,
	// 			params.privatekey
	// 		);
	// 		fs.renameSync(newFilePath, fileDir + result.fileid);
	// 		delete result.filePath;
	// 		return result;
	// 	} catch (err) {
	// 		const { cause, stack } = extractCauseAndStack(err);
	// 		throw {
	// 			error: 'Unable to fetch upload',
	// 			cause,
	// 			stack,
	// 		};
	// 	}
	// }
	// async store(params: ParamsDictionary): Promise<any> {
	// 	try {
	// 		let filePath = fileDir + params.fileid;
	// 		if (!fs.existsSync(filePath)) {
	// 			throw 'file not found';
	// 		}
	// 		const result = await this.storeApi.fileUploadWithTxHash(
	// 			params.txHash,
	// 			filePath,
	// 			params.fileid,
	// 			params.privatekey
	// 		);
	// 		return {
	// 			result,
	// 		};
	// 	} catch (err) {
	// 		const { cause, stack } = extractCauseAndStack(err);
	// 		throw {
	// 			error: 'Unable to fetch upload',
	// 			cause,
	// 			stack,
	// 		};
	// 	}
	// }
	// async retrieve(params: ParamsDictionary): Promise<any> {
	// 	try {
	// 		const fileId = params.fileId;
	// 		const fileDownPath = await this.storeApi.fileDownload(
	// 			fileId,
	// 			fileDir,
	// 			params.privatekey
	// 		);
	// 		const url = '/upload-file/' + path.basename(fileDownPath);
	// 		return {
	// 			path: fileDownPath,
	// 			url,
	// 		};
	// 	} catch (err) {
	// 		const { cause, stack } = extractCauseAndStack(err);
	// 		throw {
	// 			error: 'Unable to fetch download',
	// 			cause,
	// 			stack,
	// 		};
	// 	}
	// }
	// async replace(params: ParamsDictionary): Promise<any> {
	// 	try {
	// 		let filePath = fileDir + params.fileid;
	// 		if (!fs.existsSync(filePath)) {
	// 			throw 'file not found';
	// 		}
	// 		const result = await this.storeApi.fileUploadWithTxHash(
	// 			params.txHash,
	// 			filePath,
	// 			params.fileid,
	// 			params.privatekey
	// 		);
	// 		return {
	// 			result,
	// 		};
	// 	} catch (err) {
	// 		const { cause, stack } = extractCauseAndStack(err);
	// 		throw {
	// 			error: 'Unable to fetch upload',
	// 			cause,
	// 			stack,
	// 		};
	// 	}
	// }
	// async delete(params: ParamsDictionary): Promise<any> {
	// 	try {
	// 		if (!params.txHash) {
	// 			throw 'txHash is required.';
	// 		}
	// 		const result = await this.storeApi.fileDeleteWithTxHash(params.txHash);
	// 		return {
	// 			result,
	// 		};
	// 	} catch (err) {
	// 		const { cause, stack } = extractCauseAndStack(err);
	// 		throw {
	// 			error: 'Unable to fetch findFile',
	// 			cause,
	// 			stack,
	// 		};
	// 	}
	// }

	addressToEvm(params: ParamsDictionary): any {
		try {
			if (!params.walletAddress) {
				throw 'walletAddress is required.';
			}
			const result = Converter.addressToEvm(params.walletAddress);
			return {
				result,
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
	evmToAddress(params: ParamsDictionary): any {
		try {
			if (!params.evm) {
				throw 'evm is required.';
			}
			const result = Converter.evmToAddress(params.evm);
			return {
				result,
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
}
