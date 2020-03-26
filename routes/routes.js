const getAllAdminUser = require("./adminUsers/getAllAdminUser");
const getAdminUser = require("./adminUsers/getAdminUser");
const deleteAdminUser = require("./adminUsers/deleteAdminUser");
const updatedAdminUser = require("./adminUsers/updateAdminUser");
const addAdminUser = require("./adminUsers/addAdminUser")

const addRole = require("./roles/addRole");
const deleteRole = require("./roles/deletRole");
const updateRole = require("./roles/updateRole");
const getRoles = require("./roles/getRoles");



const getAllProducts = require("./product/getAllProducts");
const addProduct = require("./product/addProduct");
const deleteProduct = require("./product/deleteProduct");
const updateProduct = require("./product/updateProduct");
const getProduct = require("./product/getProduct");
const productUploadPhoto = require("./product/productUploadPhoto");


const addCategory = require("./category/addCategory");
const deleteCategory = require("./category/deteteCategory");
const updateCategory = require("./category/updateCategory");
const getCategory = require("./category/getCategory");
const getAllCategories = require("./category/getAllCategories");
const categoryPhotoUpload = require("./category/categoryPhotoUpload");

const generatePassword = require("./password/generatePassword");

const login = require("./auth/login");
const logout = require("./auth/logout");
const updatePassword = require("./auth/updatePassword");
const forgotPassword = require("./auth/forgotPassword");
const resetPassword = require("./auth/resetPassword");


module.exports = (server) => {
	getAllAdminUser(server);
	getAdminUser(server);
	addAdminUser(server);
	deleteAdminUser(server);
	updatedAdminUser(server);
	addRole(server);
	deleteRole(server);
	updateRole(server);
	getRoles(server);
	getAllProducts(server);
	addProduct(server);
	deleteProduct(server);
	updateProduct(server);
	getProduct(server);
	productUploadPhoto(server);
	addCategory(server);
	deleteCategory(server);
	updateCategory(server);
	getCategory(server);
	getAllCategories(server);
	categoryPhotoUpload(server);
	generatePassword(server);

	login(server);
	logout(server);
	updatePassword(server);
	forgotPassword(server);
	resetPassword(server);

}