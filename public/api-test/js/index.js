let timeout = null;
const vm = new Vue({
	el: '#app',
	data: {
		currAPIName: 'findPrice',
		group: 'fileBank',
		currAPI: '',
		apis: [],
		result: '',
		resultJson: null,
		loading: false,
		fileDownloadUrl: '',
		offlineSign: {
			file: null,
			currAPIName: 'upload',
			currAPI: '',
			apis: [],
			result: '',
			resultJson: null,
			loading: false,
		},
		progressData: null,
	},
	beforeMount: function () {
		const group =
			window.location.href.indexOf('?store') != -1 ? 'store' : 'fileBank';
		this.apis = requestAPI.filter((t) => t.group == group);
		this.offlineSign.apis = offlineSingAPI.filter((t) => t.group == group);
		this.group = group;
		console.log('group', group);
	},
	mounted: function () {
		const that = this;
		this.onChangeAPI();
		this.onChangeAPI('offline');
	},
	methods: {
		onClick(type) {
			let that = this;
			const This = this;
			if (type == 'offline') {
				that = this.offlineSign;
			}
			if (!that.currAPIName) {
				return This.$message({
					showClose: true,
					message: 'Please select a api method.',
					type: 'error',
				});
			}
			that.result = 'request sending...';
			that.loading = true;
			this[that.currAPI.fun](type).then(
				(t) => {
					that.loading = false;
				},
				(e) => {
					that.result = JSON.stringify(e);
				}
			);
		},
		copyData() {
			let sour = this.offlineSign;
			this.currAPIName = sour.currAPIName;
			this.onChangeAPI();
			console.log(sour.resultJson);
			this.currAPI.avgs.forEach((t) => {
				let v = sour.resultJson.data[t.key];
				if (!v && typeof sour.resultJson.data != 'object') {
					v = sour.resultJson.data;
				}
				t.value = v;
			});
			this.result = '';
		},
		onChangeAPI(type) {
			let that = this;
			if (type == 'offline') {
				that = this.offlineSign;
			}
			if (!that.currAPIName) {
				return;
			}
			let currAPI = that.apis.find((a) => a.name == that.currAPIName);
			if (!currAPI) {
				currAPI = that.apis[0];
				that.currAPIName = currAPI.name;
			}
			if (currAPI.avgs) {
				currAPI.avgs.forEach((t) => {
					if (t.key == 'walletAddress' || t.key == 'addr') {
						t.value = 'cXh5StobuVP4B7mGH9xn8dSsDtXks4qLAou8ZdkZ6DbB6zzxe';
					} else if (t.key == 'privatekey') {
						t.value = '123456';
					} else if (t.key == 'mnemonic') {
						t.value =
							'denial empower wear venue distance leopard lamp source off other twelve permit';
					}
				});
			}
			that.currAPI = currAPI;
		},
		getFile(e, item) {
			this.offlineSign.file = e.target.files[0];
			item.value = e.target.files[0];
		},
		async showProgress(id, name) {
			let that = this;
			that.loading = true;
			let url = '/store/task/progress';
			const fd = new FormData();
			fd.append('progressId', id);
			console.log('start request...');
			const result = await ajax('post', url, fd);
			that.progressData = result;
			console.log(
				'==========================response=========================='
			);
			console.log(result);
			console.log(
				'==========================response=========================='
			);
			if (result.isComplete) {
				result.per = 100;
				console.log(name, result);
				if (name == 'download' && result.data) {
					let url = result.data;
					url = url.split('\\').join('/');
					url = url.split('/');
					url = '/upload-file/' + url[url.length - 1];
					that.fileDownloadUrl = url;
				}
				that.loading = false;
				setTimeout(() => {
					that.progressData = null;
				}, 10000);
				return that.$alert('complete', { type: 'success' });
			}
			setTimeout(async () => {
				await that.showProgress(id, name);
			}, 200);
		},
		async commonGet(type) {
			let that = this;
			const This = this;
			if (type == 'offline') {
				that = this.offlineSign;
			}
			const currAPI = that.currAPI;
			let url = currAPI.url;
			const fd = new FormData();
			that.result = 'requsting...';
			that.resultJson = null;

			if (currAPI.avgs) {
				const arr = [];
				let err = [];
				currAPI.avgs.forEach((t) => {
					const value = t.value;
					if (t.must && value === '') {
						err.push(t.key + ' is required.');
					}
					if (currAPI.method == 'get') {
						arr.push(t.key + '=' + value);
					} else {
						fd.append(t.key, t.value);
					}
				});
				if (err.length > 0) {
					that.result = err.join(';');
					return This.$message({
						showClose: true,
						message: err.join(';'),
						type: 'error',
					});
				}
				url += '?' + arr.join('&');
			}
			console.log('start request...');
			const result = await ajax(currAPI.method, url, fd);
			console.log('response');
			if (!result) return;
			if (typeof result != 'object') {
				result = { result };
			}
			that.resultJson = result;
			that.result = JSON.stringify(result, null, 5);
			// console.log(currAPI.name, result.data.url);

			if (
				type != 'offline' &&
				currAPI.group == 'fileBank' &&
				(currAPI.name == 'upload' || currAPI.name == 'download')
			) {
				let id = currAPI.avgs.find(
					(t) => t.key == 'fileid' || t.key == 'fileId'
				).value;
				await that.showProgress(id, currAPI.name);
			}
			return result;
		},
	},
});
