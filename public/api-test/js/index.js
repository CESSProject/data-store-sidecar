var vm = new Vue({
	el: '#app',
	data: {
		currAPIName: '',
		currAPI: '',
		apis: requestAPI,
		result: '',
		loading: false,
		offlineSign: {
			file: null,
			currAPIName: '',
			currAPI: '',
			apis: offlineSingAPI,
			result: '',
			loading: false,
		},
	},
	beforeMount: function () {},
	mounted: function () {},
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
			that.result = JSON.stringify(result, null, 5);
			if (currAPI.name == 'download'&&result.url) {
				This.$alert(
					'<a target="_blank" href="' +result.url +'" style="color:blue;" class="fa fa-save"> The file is ready. Click here to save</a>',
					{
						dangerouslyUseHTMLString: true,
					}
				);
			}
			return result;
		},
	},
});
