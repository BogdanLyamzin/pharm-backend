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

//Content
const fileUploadPage = require('./filesUpload/fileUploadPages');
const addContent = require('./filesUpload/addContent');
const getAllContent = require('./filesUpload/getAllContent');

//File
const getAllIFiles = require('./file/getAllIFiles');
const getFileById = require('./file/getFileById');
const editFileName = require('./file/editFileName');
const deleteFile = require('./file/deleteFile');

//Image
const getAllIImages = require('./image/getAllImages');
const getImageById = require('./image/getImageById');
const deleteImage = require('./image/deleteImage');

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

    fileUploadPage(app);
    addContent(app);
    getAllContent(app);

    getAllIFiles(app);
    getFileById(app);
    editFileName(app);
    deleteFile(app);

    getAllIImages(app);
    getImageById(app);
    deleteImage(app);
};
