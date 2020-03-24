//Menu
const getAllMenus = require('./menus/getAllMenus');
const addMenu = require('./menus/addMenu');
const getMenuById = require('./menus/getMenuById');
const editMenu = require('./menus/editMenu');
const deleteMenu = require('./menus/deleteMenu');

//MenuItem
const getAllMenuItems = require('./menus/menuItems/getAllMenuItems');
const addMenuItem = require('./menus/menuItems/addMenuItem');
const getMenuItemById = require('./menus/menuItems/getMenuItemById');
const editMenuItem = require('./menus/menuItems/editMenuItem');
const deleteMenuItem = require('./menus/menuItems/deleteMenuItem');

module.exports = app => {
    getAllMenus(app);
    addMenu(app);
    getMenuById(app);
    editMenu(app);
    deleteMenu(app);

    getAllMenuItems(app);
    addMenuItem(app);
    getMenuItemById(app);
    editMenuItem(app);
    deleteMenuItem(app);
};
