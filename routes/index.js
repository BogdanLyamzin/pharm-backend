const {login, refreshToken} = require("./login/login");

module.exports = (server) => {

    //auth
    login(server);
    refreshToken(server);

};