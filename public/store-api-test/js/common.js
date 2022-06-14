function ajax(method, url, data) {
	return new Promise((resolve, reject) => {
		let options = {
			method: method || 'POST',
			url: url,
			// headers: {
			// 	'Content-Type': 'multipart/form-data',
			// },
		};
		if (method != 'get' && data) {
			options.body = data;
		}
		fetch(url, options)
			.then((res) => {
				console.log(res);
				return res.json();
			})
			.then((data) => {
				resolve(data);
			})
			.catch((error) => {
				console.log(error);
				reject(error);
			});
	});
}
function strTrim(str) {
	str = str.replace(/(^\s*)|(\s*$)/g, '');
	return str;
}
function serializeJson(obj) {
	var serializeObj = {};
	var array = obj.serializeArray();
	var str = obj.serialize();
	$(array).each(function () {
		if (serializeObj[this.name]) {
			if ($.isArray(serializeObj[this.name])) {
				serializeObj[this.name].push(this.value);
			} else {
				serializeObj[this.name] = [serializeObj[this.name], this.value];
			}
		} else {
			serializeObj[this.name] = this.value;
		}
	});
	return serializeObj;
}
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
function timestr(fmt, time) {
	var now = time ? new Date(time) : new Date();
	var o = {
		'M+': now.getMonth() + 1, //月份
		'd+': now.getDate(), //日
		'h+': now.getHours(), //小时
		'm+': now.getMinutes(), //分
		's+': now.getSeconds(), //秒
		'q+': Math.floor((now.getMonth() + 3) / 3), //季度
		S: now.getMilliseconds(), //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(
			RegExp.$1,
			(now.getFullYear() + '').substr(4 - RegExp.$1.length)
		);
	for (var k in o)
		if (new RegExp('(' + k + ')').test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
			);
	return fmt;
}
function clone(obj) {
	var o;
	switch (typeof obj) {
		case 'undefined':
			break;
		case 'string':
			o = obj + '';
			break;
		case 'number':
			o = obj - 0;
			break;
		case 'boolean':
			o = obj;
			break;
		case 'object': // object 分为两种情况 对象（Object）或数组（Array）
			if (obj === null) {
				o = null;
			} else {
				if (Object.prototype.toString.call(obj).slice(8, -1) === 'Array') {
					o = [];
					for (var i = 0; i < obj.length; i++) {
						o.push(clone(obj[i]));
					}
				} else {
					o = {};
					for (var k in obj) {
						o[k] = clone(obj[k]);
					}
				}
			}
			break;
		default:
			o = obj;
			break;
	}
	return o;
}
Array.prototype.unique = function () {
	var res = [this[0]];
	for (var i = 1; i < this.length; i++) {
		var repeat = false;
		for (var j = 0; j < res.length; j++) {
			if (this[i] === res[j]) {
				repeat = true;
				break;
			}
		}
		if (!repeat) {
			res.push(this[i]);
		}
	}
	return res;
};
function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function loadScript(url, callback) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	if (typeof callback != 'undefined') {
		if (script.readyState) {
			script.onreadystatechange = function () {
				if (script.readyState == 'loaded' || script.readyState == 'complete') {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			script.onload = function () {
				callback();
			};
		}
	}
	script.src = url;
	document.body.appendChild(script);
}
function isEmpty(value) {
	var result = false;
	console.log(typeof value);
	switch (typeof value) {
		case 'string':
			result = value == '';
			break;
		case 'undefined':
			result = true;
			break;
		case 'number':
			result = false;
			break;
		case 'object':
			var tmp = JSON.stringify(value);
			result = tmp == '{}' || tmp == '[]' ? true : false;
			break;
	}
	return result;
}
//数据随机排序
Array.prototype.randSort = function (s1, s2) {
	return this.sort(function () {
		return Math.random() - 0.5;
	});
	// return this.sort(() => Math.random() - 0.5);
};
String.prototype.replaceAll = function (s1, s2) {
	//return this.replace(new RegExp(s1, "gm"), s2);
	return this.split(s1).join(s2);
};
String.prototype.mytrim = function () {
	var a = this.replace(new RegExp('\r', 'gm'), '');
	a = a.replace(new RegExp('\n', 'gm'), '');
	a = a.replace(new RegExp('\t', 'gm'), '');
	return a.trim();
};
String.prototype.mysubstr = function (strStart, strEnd) {
	var str = this.substr(this.indexOf(strStart) + strStart.length);
	return str.substring(0, str.indexOf(strEnd));
};
