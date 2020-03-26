const Product = require("../../models/Product");
const Category = require("../../models/Category");
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require("../../middleware/async");


// lan: all|ru|ua
module.exports = (app) => {
	app.get("/:lan/testproducts", asyncHandler(async (req, res, next) => {
		const data1 = await Product.aggregate([
			{ $project: {
				_id: 0,
				"content.ru.productName": 1,
				"sortproductName": {$toLower: "$content.ru.productName"}
				}},
			{$sort: {"sortproductName": 1}}
		]);

		const data2 = await Product.aggregate([
			{ $project: {
					_id: 0,
					"uniquePC": 1,
					"sortuniquePC": {$toLower: "$uniquePC"}
				}},
			{$sort: {"sortuniquePC": 1}}
		]);

		const data3 = await Product.aggregate([
			{$match: {}},
			{$project: {
				_id: 0,
				"content.ru.brand": 1,
				"letter": {
					$let: {
						vars: {
							numArr: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
							lowerFL: {$substrCP: [{$toLower: "$content.ru.brand"}, 0, 1]}
						},
						in: {
							$cond: {
								if: {$in: ["$$lowerFL", "$$numArr"]},
								then: "0-9",
								else: "$$lowerFL"
							}
						}
					}
				}


			}},
			{$group: {
				_id: "$letter",
				items: {
					$push: {
						brand: "$content.ru.brand"
					}
				},
				count: {$sum: 1}
			}},
			{$sort: {"_id": 1}}
		]);

		const data4 = await Product.find({"content.ru.productName": /ПАН/})
		const data = await Product.find({}).sort("content.ru.productName").collation( { locale: 'ru', strength: 2 })






		return res.status(200).json({ success: true, data });
	}))
}