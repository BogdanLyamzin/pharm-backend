const Product = require("../../models/Product");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/async");
const checkCategory = require("../../utils/checkCategory");


module.exports = (app) => {
	app.post("/:lan/products", asyncHandler(async (req, res, next) => {
		const lan = req.params.lan;
		const bodyObj = {...req.body};
		delete bodyObj.uniquePC;
		delete bodyObj.category;
		delete bodyObj.price;

		if(!req.body.uniquePC && !req.productName){
			return next(new ErrorResponse(`Please add an unique cord of the product and name of the product`, 400));
		};
		const product = await Product.find({uniquePC: req.body.uniquePC});

		if(product.length){
			if(product[0][lan]){
				return next(new ErrorResponse(`This product on ${lan} already exists`, 400));
			};
			const updatedBody = {};
			if(req.body.price){
				updatedBody.price = req.body.price;
			};
			updatedBody.content = {...product[0].content};
			updatedBody.content[lan] = bodyObj;
			updatedBody[lan] = true;
			await Product.findByIdAndUpdate(product[0]._id, updatedBody);
			const data = await Product.findById(product[0]._id);
			res.status(201).json({
				success: true,
				data
			});
			return
		};
		const savedBody = {};
		const id = await checkCategory(req.body.category, lan);
		if(!id){
			return next(new ErrorResponse(`At first, add a category or add a title on ${lan} of it`, 400));
		};
		savedBody.category = id;
		if(req.body.price){
			savedBody.price = req.body.price;
		}
		savedBody.uniquePC = req.body.uniquePC;
		savedBody[lan] = true;
		savedBody.content = {};
		savedBody.content[lan] = bodyObj;
		const savedProduct = new Product(savedBody);
		const data = await savedProduct.save();

		res.status(201).json({
			success: true,
			data
		});
	}))
}