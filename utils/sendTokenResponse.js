const {NODE_ENV, JWT_COOKIE_EXPIRE} = require("../configs/db");

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	// Create token
	const token = user.generatorAccessToken();
    //?????
	const options = {
		// minutes
		expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 60 * 1000),
		httpOnly: true
	};

	if (NODE_ENV === "production") {
		options.secure = true;
	}

	res
			.status(statusCode)
			.cookie("token", token, options)
			.json({
				success: true,
				token
			});
};

module.exports = sendTokenResponse;