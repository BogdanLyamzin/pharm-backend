const auth = require('../../controllers/auth');
// const passport = require('passport');

exports.login = (app)=> {
    app.post( "/login", auth.signIn )
};


exports.refreshToken = (app)=> {
    app.post( "/refresh-tokens", auth.refreshTokens);
};



