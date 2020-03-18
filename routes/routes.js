const getAllAdminUser = require("./adminUsers/getAllAdminUser");
const getAdminUser = require("./adminUsers/getAdminUser");
const deleteAdminUser = require("./adminUsers/deleteAdminUser");
const updatedAdminUser = require("./adminUsers/updateAdminUser");
const addAdminUser = require("./adminUsers/addAdminUser")

const addRole = require("./roles/addRole");
const deleteRole = require("./roles/deletRole");
const updateRole = require("./roles/updateRole");
const getRoles = require("./roles/getRoles");

const generatePassword = require("./password/generatePassword");

const getAllProducts = require("./product/getAllProducts")




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
	generatePassword(server);
	getAllProducts(server)

}