const Product = require("../../models/Product");
const Role = require("../../models/Role");
const advancedResults = require("../../middleware/advancedResults");
const asyncHandler = require("../../middleware/async")


module.exports = (app) => {
	app.get("/:lan/products", advancedResults(Product), asyncHandler(async (req, res, next) => {

		res.status(200).json( req.params.lan);
	}))
}