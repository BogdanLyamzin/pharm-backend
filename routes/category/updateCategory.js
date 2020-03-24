const Category = require("../../models/Category");
const asyncHandler = require("../../middleware/async");
const ErrorResponse = require('../../utils/errorResponse');
const checkCategory = require("../../utils/checkCategory");
const { protect } = require("../../middleware/auth");

module.exports = (app) => {
	app.put("/:lan/categories/:id", protect, asyncHandler(async (req, res, next) => {
		const id = req.params.id;
		const lan = req.params.lan;
		const qerBody = {...req.body};
		delete qerBody.uniqueCC;
		delete qerBody.categoryParent;

		const category = await Category.findById(id);

		if (!category) {
			return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
		};

		if(req.body.photo){
			return next(new ErrorResponse("To change field 'photo' use another route", 404));
		};
		const updateBody = {};
		const strPath = `content.${lan}`;
		const oldData = {};
		const obj = {...category.content[lan]};
		for (let key in obj){
			if(obj[key]){
				oldData[key] = obj[key];
			}
		};
		updateBody[strPath] = {...oldData, ...qerBody};
		if(req.body.uniqueCC){
			updateBody.uniqueCC = req.body.uniqueCC
		};
		if(req.body.categoryParent){
			const idCat = await checkCategory(req.body.categoryParent, lan);
			if(!idCat){
				return next(new ErrorResponse(`At first, add a new parent category or add a title on ${lan} of it`, 400));
			};
			updateBody.categoryParent = idCat;
		}
		if(!category[lan]){
			updateBody[lan] = true
		};
		await Category.findByIdAndUpdate(id, updateBody);
		const data = await Category.findById(id);

		res.status(201).json({
			success: true,
			data
		});

	}))
}