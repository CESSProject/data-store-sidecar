var vm = new Vue({
	el: '#app',
	data: {
		currAPIName: '',
		currAPI: '',
		apis: requestAPI,
		result: '',
		offlineSign: {
			file: null,
			currAPIName: '',
			currAPI: '',
			apis: offlineSingAPI,
			result: '',
		},
	},
	beforeMount: function () {
		var that = this;
	},
	mounted: function () {
		var that = this;
	},
	methods: {
		onClick(type) {
			let that = this;
			if (type == 'offline') {
				that = this.offlineSign;
			}
			if (!that.currAPIName) {
				return this.$message({
					showClose: true,
					message: 'Please select a api method.',
					type: 'error',
				});
			}
			this[that.currAPI.fun](type).then(
				(t) => {},
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
			if (type == 'offline') {
				that = this.offlineSign;
			}
			const currAPI = that.currAPI;
			let url = currAPI.url;
			const fd = new FormData();
			if (currAPI.avgs) {
				if (currAPI.method == 'get') {
					let arr = currAPI.avgs.map((t) => t.key + '=' + t.value);
					url += '?' + arr.join('&');
				} else {
					currAPI.avgs.forEach((t) => {
						fd.append(t.key, t.value);
					});
				}
			}
			console.log('start request...');
			const result = await ajax(currAPI.method, url, fd);
			console.log('response');
			if (!result) return;
			if (typeof result != 'object') {
				result = { result };
			}
			that.result = JSON.stringify(result,null,5);
		},
	},
});
