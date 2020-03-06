//Menu
const getAllMenus = require('./menus/getAllMenus');
const postMenu = require('./menus/postMenu');
const getMenuById = require('./menus/getMenuById');
const putMenu = require('./menus/putMenu');
const deleteMenu = require('./menus/deleteMenu');

//MenuItem
const getAllMenuItems = require('./menus/menuItems/getAllMenuItems');
const postMenuItem = require('./menus/menuItems/postMenuItem');
const getMenuItemById = require('./menus/menuItems/getMenuItemById');
const putMenuItem = require('./menus/menuItems/putMenuItem');
const deleteMenuItem = require('./menus/menuItems/deleteMenuItem');

module.exports = app => {
    getAllMenus(app);
    postMenu(app);
    getMenuById(app);
    putMenu(app);
    deleteMenu(app);

    getAllMenuItems(app);
    postMenuItem(app);
    getMenuItemById(app);
    putMenuItem(app);
    deleteMenuItem(app);
};
