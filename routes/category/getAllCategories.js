const Category = require("../../models/Category");
const advancedResults = require("../../middleware/advancedResults");
const asyncHandler = require("../../middleware/async")
const { protect } = require("../../middleware/auth");

module.exports = (app) => {
	app.get("/:lan/categories", protect, advancedResults(Category, Category, "categoryParent"), asyncHandler(async (req, res, next) => {
		const languages = Category.getLanguages();
		const data = res.advancedResults;
		if(req.params.lan === "all"){
			const resArr = data.data;
			resArr.forEach((obj, index) =>{
				resArr[index] = {
					_id: obj._id,
					cord: obj.uniqueCC,
					photo: obj.photo,
					ua: {...obj.ua},
					ru: {...obj.content.ru}
				}
				if(obj.categoryParent){
					resArr[index].ru.parentCategory = obj.categoryParent.content.ru.title;
					resArr[index].ua.parentCategory = obj.categoryParent.content.ua.title;
				}
			});
			data.data = resArr;
			return res.status(200).json( data);
		}
		const resArr = data.data;
		resArr.forEach((obj, index) => {
			resArr[index] = {...obj.content[req.params.lan],

				cord: obj.uniqueCC,
				photo: obj.photo,
				_id: obj._id
			}
			if(obj.categoryParent){
				resArr[index].parentCategory = obj.categoryParent.content[req.params.lan].title

			}
		})
		data.data = resArr;
		res.status(200).json( data);
	}))
}