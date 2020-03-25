const {login, refreshToken} = require("./login/login");
const current = require("./login/current");
const {addLanguage, deleteLanguage, getLanguages, updateLanguage, setLanguage} = require('./language');

const {saveTest} = require('./test/save-test-prod');
const {getTest} = require('./test/get-test-prod');

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
    setLanguage(server);


    saveTest(server);
    getTest(server);
};