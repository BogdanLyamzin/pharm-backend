const Caregory = require("../../models/Category");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/async");
const addIntlData = require("../../utils/addIntlData");
const { protect } = require("../../middleware/auth");


module.exports = (app) => {
	app.post("/:lan/categories", protect, asyncHandler(async (req, res, next) => {
		const lan = req.params.lan;
		const languages = Caregory.getLanguages();
		const defaultLanguage = Caregory.getDefaultLanguage();
		const bodyObj = {...req.body};
		delete bodyObj.uniqueCC;

		if(!req.body.uniqueCC && !req.body.title){
			return next(new ErrorResponse(`Please add an unique cord category and title`, 400));
		};
		const category = await Caregory.find({uniqueCC: req.body.uniqueCC});
		if(category.length){
			if(lan === "all"){
				let check = true;
				languages.forEach(l =>{
					check = check && category[0].language[l] === "yes"
				});
				if(check){
					return next(new ErrorResponse(`This category already exists`, 400));
				}
			}else if(category[0].language[lan] === "yes" ){
					return next(new ErrorResponse(`This category on ${lan} already exists`, 400));
			};
			const data = await addIntlData(lan, defaultLanguage, bodyObj, category[0], next);
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
		const newCaregory = new Caregory({uniqueCC: req.body.uniqueCC});
		const data = await addIntlData(lan, defaultLanguage, bodyObj, newCaregory, languages, next);
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