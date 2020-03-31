const Product = require("../../models/Product");
const asyncHandler = require("../../middleware/async");
const ErrorResponse = require('../../utils/errorResponse');
const addIntlData = require("../../utils/addIntlData");
const { protect } = require("../../middleware/auth");

module.exports = (app) => {
	app.put("/:lan/products/:id", protect, asyncHandler(async (req, res, next) => {
		const id = req.params.id;
		const lan = req.params.lan;
		const qerBody = {...req.body};
		const languages = Product.getLanguages();
		const defaultLanguage = Product.getDefaultLanguage();

		const product = await Product.findById(id);

		if (!product) {
			return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
		};

		if(req.body.photo){
			return next(new ErrorResponse("To change field 'photo' use another route", 404));
		};

		const data = await addIntlData(lan, defaultLanguage, qerBody, product, languages, next);
		if(!data){
			return
		};
		///Temporary solution (????)
		data.author = req.adminUser._id;
		await data.save();

		res.status(201).json({
			success: true,
			data
		});
	}))
}