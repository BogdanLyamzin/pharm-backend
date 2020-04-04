module.exports = {
	mongoURI: "mongodb+srv://aNasypana:N2020aLLa@cluster0-mhmxf.mongodb.net/pharm?retryWrites=true&w=majority",
	NODE_ENV: "development",
	JWT_COOKIE_EXPIRE: 60,
	jwt:{
		secret: "secret",
		tokens: {
			access: {
				type: 'access',
				expiresIn: '60m'
			},
			refresh: {
				type: 'refresh',
				expiresIn: '120m'
			},
		},
	},
};