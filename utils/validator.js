const XRegExp = require('xregexp');

module.exports = function (val, regEx, message) {
	if (!XRegExp.test(val,regEx)) {
		throw new Error(message)
	}
	
}