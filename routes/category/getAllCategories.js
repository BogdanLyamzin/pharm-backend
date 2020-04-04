const Category = require("../../models/Category");
const advancedResults = require("../../middleware/advancedResults");
const asyncHandler = require("../../middleware/async")
const { protect } = require("../../middleware/auth");
const transformIntlObj = require("../../utils/transformIntlObj");

module.exports = (app) => {
	app.get("/:lan/categories", protect, advancedResults(Category, Category, "categoryParent", "title"), asyncHandler(async (req, res, next) => {
		const data = res.advancedResults;
		const resArr = data.data;

		resArr.forEach((obj, index) =>{
			resArr[index] =  transformIntlObj(obj, req.params.lan);

		});

		data.data = resArr;
		return res.status(200).json( data);

	}))
}
