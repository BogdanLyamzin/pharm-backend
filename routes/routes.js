const home = require("./pages/home");

//menus
const getAllMenus = require("./menus/getAllMenus");

module.exports = app => {
    home(app);
    getAllMenus(app);
};