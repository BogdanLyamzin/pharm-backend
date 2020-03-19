const Caregory = require("../../models/Category");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/async");
const checkCategory = require("../../utils/checkCategory");


module.exports = (app) => {
	app.post("/:lan/categories", asyncHandler(async (req, res, next) => {
		const lan = req.params.lan;
		const bodyObj = {...req.body};
		delete bodyObj.uniqueCC;
		delete bodyObj.categoryParent;

		if(!req.body.uniqueCC && !req.body.title){
			return next(new ErrorResponse(`Please add an unique cord category and title`, 400));
		};
		const category = await Caregory.find({uniqueCC: req.body.uniqueCC});

		if(category.length){
			if(category[0][lan]){
				return next(new ErrorResponse(`This category on ${lan} already exists`, 400));
			};
			const updatedBody = {};
			updatedBody.content = {...category[0].content};
			updatedBody.content[lan] = bodyObj;
			updatedBody[lan] = true;
			await Caregory.findByIdAndUpdate(category[0]._id, updatedBody);
			const data = await Caregory.findById(category[0]._id);
			res.status(201).json({
				success: true,
				data
			});
			return
		};
		const savedBody = {};
		if(req.body.categoryParent){
			const id = await checkCategory(req.body.categoryParent, lan);
			if(!id){
				return next(new ErrorResponse(`At first add a parent category or add a title on ${lan} of it`, 400));
			};
			savedBody.categoryParent = id;

		};
		savedBody.uniqueCC = req.body.uniqueCC;
		savedBody[lan] = true;
		savedBody.content = {};
		savedBody.content[lan] = bodyObj;
		const savedCategory = new Caregory(savedBody);
		const data = await savedCategory.save();

		res.status(201).json({
			success: true,
			data
		});
	}))
}