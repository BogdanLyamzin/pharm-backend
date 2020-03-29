const Test = require("../../models/TestModel");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/async")


module.exports = (app) => {
	app.post("/:lan/tests", asyncHandler(async (req, res, next) => {
		const lan = req.params.lan;
		const bodyObj = {...req.body};
		delete bodyObj.uniquePC;
		const languages = Test.getLanguages();
		const defaultLanguage = Test.getDefaultLanguage();
		const test = await Test.find({uniquePC: req.body.uniquePC});

		if(test.length){

			if(lan !== defaultLanguage){
				for (let key in bodyObj){
					test[0].set(`${key}.${lan}`, bodyObj[key])
				}
				test[0].set(`language.${lan}`, "yes")
				console.log(`language.${lan}`)

			}
			for (let key in bodyObj){
				test[0][key] = bodyObj[key]
			}
			test[0].language = "yes";
			await test[0].save();
			return res.status(200).json({ success: true, data: test[0]});

		}
		const newTest = new Test({uniquePC: req.body.uniquePC});
		if(lan !== defaultLanguage){
			for (let key in bodyObj){
				newTest.set(`${key}.${lan}`, bodyObj[key])
			}
			newTest.set(`language.${lan}`, "yes")

		}
		for (let key in bodyObj){
			newTest[key] = bodyObj[key]
		}
		newTest.language = "yes";
		await newTest.save();




		return res.status(200).json({ success: true, data: newTest});
	}))
}