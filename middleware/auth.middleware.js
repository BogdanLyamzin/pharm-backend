const jwt = require("jsonwebtoken");

// Add adminUser in request!!!
module.exports = (req, res, next) => 	{
	if(req.method === "OPTIONS"){
		return next()
	}
	try {
		const token = req.headers.authorization.split(" ")[1] //"Bearer TOKEN"
		if(!token){
			return res.status(401).json({ message: "Нет авторизации"})
		};

		const decoded = jwt.verify(token, require("./configs/db").secretOrKey); ///????
		req.adminUser = decoded;
		next()
	}catch (e) {
		res.status(401).json({ message: "Нет авторизации"})
	}
}