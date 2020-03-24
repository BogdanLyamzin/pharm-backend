const {login, refreshToken} = require("./login/login");
const current = require("./login/current");
const {addLanguage, deleteLanguage, getLanguages, updateLanguage} = require('./language');

module.exports = (server) => {

    //auth
    login(server);
    refreshToken(server);
    current(server);

    //language
    addLanguage(server);
    deleteLanguage(server);
    getLanguages(server);
    updateLanguage(server);
};