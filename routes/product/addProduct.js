const Product = require("../../models/Product");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/async");
const addIntlData = require("../../utils/addIntlData");
const { protect } = require("../../middleware/auth");


module.exports = (app) => {
	app.post("/:lan/products", protect, asyncHandler(async (req, res, next) => {
		const lan = req.params.lan;
		const bodyObj = {...req.body};
		const languages = Product.getLanguages();
		const defaultLanguage = Product.getDefaultLanguage();
		delete bodyObj.uniquePC;

		if(!req.body.uniquePC && !req.productName){
			return next(new ErrorResponse(`Please add an unique cord of the product and name of the product`, 400));
		};

		if(req.body.photo){
			return next(new ErrorResponse("To add field 'photo' use another route", 404));
		};

		const product = await Product.find({uniquePC: req.body.uniquePC});

		if(product.length){
			if(lan === "all"){
				return next(new ErrorResponse(`This product already exists`, 400));
			};
			if(product[0].get(`language.${lan}`) === "yes" ){
				return next(new ErrorResponse(`This product on ${lan} already exists`, 400));
			};
			const data = await addIntlData(lan, defaultLanguage, bodyObj, product[0], languages, next);
			if(!data){
				return
			}
			data.author = req.adminUser._id;
			await data.save();

			return res.status(201).json({
				success: true,
				data
			});
		};

		const newProduct = new Product({uniquePC: req.body.uniquePC});

		const data = await addIntlData(lan, defaultLanguage, bodyObj, newProduct, languages, next);
		if(!data){
			return
		}
		data.author = req.adminUser._id;
		await data.save();

		res.status(201).json({
			success: true,
			data
		});
	}))
}
