const Product = require("../../models/Product");
const Category = require("../../models/Category");
const asyncHandler = require("../../middleware/async");
const ErrorResponse = require('../../utils/errorResponse');
const checkCategory = require("../../utils/checkCategory");
const { protect } = require("../../middleware/auth");

module.exports = (app) => {
	app.put("/:lan/products/:id", protect, asyncHandler(async (req, res, next) => {
		const id = req.params.id;
		const lan = req.params.lan;
		const qerBody = {...req.body};
		delete qerBody.uniquePC;
		delete qerBody.category;
		delete qerBody.price;

		const product = await Product.findById(id);
		console.log(product)

		if (!product) {
			return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
		};

		if(req.body.photo){
			return next(new ErrorResponse("To change field 'photo' use another route", 404));
		};
		const updateBody = {};
		const strPath = `content.${lan}`;
		const oldData = {};
		const obj = {...product.content[lan]};
		for (let key in obj){
			if(obj[key]){
				oldData[key] = obj[key];
			}
		}
		updateBody[strPath] = {...oldData, ...qerBody};

		if(req.body.uniquePC){
			updateBody.uniquePC = req.body.uniquePC
		};
		if(req.body.category){
			const idCat = await checkCategory(req.body.category, lan);
			if(!idCat){
				return next(new ErrorResponse(`At first, add a new category or add a title on ${lan} of it`, 400));
			};
			updateBody.category = idCat;
		}
		if(!product[lan]){
			updateBody[lan] = true
		};
		await Product.findByIdAndUpdate(id, updateBody);
		const data = await Product.findById(id);

		res.status(201).json({
			success: true,
			data
		});

	}))
}