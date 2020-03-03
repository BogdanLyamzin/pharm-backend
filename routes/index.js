const {login, refreshToken} = require("./login/login");
const current = require("./login/current");

module.exports = (server) => {

    //auth
    login(server);
    refreshToken(server);
    current(server)

};