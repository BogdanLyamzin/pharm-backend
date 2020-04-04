const XRegExp = require('xregexp');

module.exports = function createValidate(...args)  {
	const obj = {};
	args.forEach(({ reg, name, error }) => obj[name] = {
		validator: function (v) {
			return XRegExp.test(v, reg);
		},
		message: props => error
	});
	return obj;
}




