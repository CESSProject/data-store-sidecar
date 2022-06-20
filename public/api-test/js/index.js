let timeout = null;
const vm = new Vue({
	el: '#app',
	data: {
		currAPIName: 'findPrice',
		currAPI: '',
		apis: requestAPI,
		result: '',
		resultJson: null,
		loading: false,
		fileDownloadUrl: '',
		offlineSign: {
			file: null,
			currAPIName: 'upload',
			currAPI: '',
			apis: offlineSingAPI,
			result: '',
			resultJson: null,
			loading: false,
		},
	},
	beforeMount: function () {},
	mounted: function () {
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
			this.currAPI.avgs.forEach(t=>{
				let v=sour.resultJson.data[t.key]||sour.resultJson.data;
				t.value=v;
			});
		},
		onChangeAPI(type) {
			let that = this;
			if (type == 'offline') {
				that = this.offlineSign;
			}
			if (!that.currAPIName) {
				return;
			}
			const currAPI = that.apis.find((a) => a.name == that.currAPIName);
			if (currAPI.avgs) {
				currAPI.avgs.forEach((t) => {
					if (t.key == 'walletAddress') {
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
			that.resultJson=null;
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
			if (currAPI.name == 'download' && result.data.url) {
				that.fileDownloadUrl = result.data.url;
				console.log('here...');
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					that.fileDownloadUrl = '';
				}, 20000);
			}
			return result;
		},
	},
});
