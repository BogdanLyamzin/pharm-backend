const jwt = require("jsonwebtoken");
const { secret } = require('../configs/db').jwt;
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const AdminUser = require("../models/AdminUser");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		// Set token from Bearer token in header
		token = req.headers.authorization.split(' ')[1];
	}
	// else if (req.cookies.token) {
	//   token = req.cookies.token;
	// }

	// Make sure token exists
	if (!token) {
		return next(new ErrorResponse("Not authorized to access this route", 401));
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, secret);
		req.adminUser = await AdminUser.findById(decoded.id).populate({path: "role", select: "role"});
		next();
	} catch (err) {
		return next(new ErrorResponse('Not authorized to access this route', 401));
	}
});

// Grant access to specific roles
exports.authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role.role)) {
			return next(new ErrorResponse(`User role ${req.user.role.role} is not authorized to access this route`,	403));
		}
		next();
	};
};
