const Category = require("../../models/Category");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/async");
const addIntlData = require("../../utils/addIntlData");
const { protect } = require("../../middleware/auth");


module.exports = (app) => {
	app.post("/:lan/categories", protect, asyncHandler(async (req, res, next) => {
		const lan = req.params.lan;
		const languages = Category.getLanguages();
		const defaultLanguage = Category.getDefaultLanguage();
		const bodyObj = {...req.body};
		delete bodyObj.uniqueCC;

		if(!req.body.uniqueCC && !req.body.title){
			return next(new ErrorResponse(`Please add an unique cord category and title`, 400));
		};
		if(req.body.photo){
			return next(new ErrorResponse("To add field 'photo' use another route", 404));
		};
		const category = await Category.find({uniqueCC: req.body.uniqueCC});

		if(category.length){
			if(lan === "all"){
				return next(new ErrorResponse(`This category already exists`, 400));
			}
			if(category[0].get(`language.${lan}`) === "yes" ){
					return next(new ErrorResponse(`This category on ${lan} already exists`, 400));
			};
			const data = await addIntlData(lan, defaultLanguage, bodyObj, category[0], languages, next);
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
		const newCategory = new Category({uniqueCC: req.body.uniqueCC});
		const data = await addIntlData(lan, defaultLanguage, bodyObj, newCategory, languages, next);
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