const Product = require("../../models/Product");
const Category = require("../../models/Category");
const advancedResults = require("../../middleware/advancedResults");
const asyncHandler = require("../../middleware/async")


module.exports = (app) => {
	app.get("/:lan/products", advancedResults(Product, Category, "category"), asyncHandler(async (req, res, next) => {

		const data = res.advancedResults;
		if(req.params.lan === "all"){
			const resArr = data.data;
			resArr.forEach((obj, index) =>{
				resArr[index] = {
					_id: obj._id,
					cord: obj.uniquePC,
					price: obj.price,
					photo: obj.photo,
					ua: {...obj.content.ua, category: obj.category.content.ua.title},
					ru: {...obj.content.ru, category: obj.category.content.ru.title}
				}
			});
			data.data = resArr;
			return res.status(200).json( data);
		}
		const resArr = data.data;
		resArr.forEach((obj, index) => {
			resArr[index] = {...obj.content[req.params.lan],
				_id: obj._id,
				price: obj.price,
				cord: obj.uniquePC,
				category: obj.category.content[req.params.lan].title,
				photo: obj.photo
			}
		})
		data.data = resArr;
		res.status(200).json( data);
	}))
}