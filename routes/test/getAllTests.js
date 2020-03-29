const Test = require("../../models/TestModel");

const asyncHandler = require("../../middleware/async")


module.exports = (app) => {
	app.get("/:lan/tests", asyncHandler(async (req, res, next) => {
		const lan = req.params.lan
		const data = await Test.find({}).sort(`-brand.${lan}`).collation( { locale: `${lan}`, strength: 2 });



		return res.status(200).json({ success: true, data });
	}))
}