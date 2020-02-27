const getAllAdminUser = require("./adminUsers/getAllAdminUser");
const getAdminUser = require("./adminUsers/getAdminUser");
const deleteAdminUser = require("./adminUsers/deleteAdminUser");
const updatedAdminUser = require("./adminUsers/updateAdminUser");

module.exports = (server) => {
	getAllAdminUser(server);
	getAdminUser(server);
	deleteAdminUser(server);
	updatedAdminUser(server);

}