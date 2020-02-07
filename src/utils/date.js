// date.js
export function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
}

function padLeftZero(str) {
	return ('00' + str).substr(str.length);
}

export function str2Date(dateStr, separator) {
	if (!separator) {
		separator = "-";
	}
	let dateArr = dateStr.split(separator);
	let year = parseInt(dateArr[0]);
	let month;
	//处理月份为04这样的情况
	if (dateArr[1].indexOf("0") == 0) {
		month = parseInt(dateArr[1].substring(1));
	} else {
		month = parseInt(dateArr[1]);
	}
	let day = parseInt(dateArr[2]);
	let date = new Date(year, month - 1, day);
	return date;
}

// 价格计算保留两位小数
export const priceFormat = (price) => {
	function number_format(number, decimals, dec_point, thousands_sep) {
		/*
		 * 参数说明：
		 * number：要格式化的数字
		 * decimals：保留几位小数
		 * dec_point：小数点符号
		 * thousands_sep：千分位符号
		 * */
		number = (number + '').replace(/[^0-9+-Ee.]/g, '');
		let n = !isFinite(+number) ? 0 : +number,

			prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
			sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
			dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
			s = '',
			toFixedFix = function(n, prec) {
				let k = Math.pow(10, prec);
				return '' + Math.floor(n * k) / k;
			};
		s = (prec ? toFixedFix(n, prec) : '' + Math.floor(n)).split('.');
		let re = /(-?\d+)(\d{3})/;
		while (re.test(s[0])) {
			s[0] = s[0].replace(re, "$1" + sep + "$2");
		}

		if ((s[1] || '').length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1).join('0');
		}
		return s.join(dec);
	}
	if(price < 0) return 0; // 如果出现负数的情况，那么直接返回0
	else return number_format(price, 2, ".", ",");
	
}