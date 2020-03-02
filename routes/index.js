
const login = require("./login/login");
const register = require("./login/register");
const current = require("./login/current");


module.exports = (server) => {
    login(server);
    register(server);
    current(server);
};