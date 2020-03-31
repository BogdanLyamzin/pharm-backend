const checkCategory = require("./checkCategory");
const ErrorResponse = require("./errorResponse");

module.exports = async (lan, deflan, bodyObj, saveObj, languages, next) =>{
	try {
		const unchKeys = ["uniquePC", "uniqueCC", "OTC_RX", "price", "photo", "author", "createdAt"];
		if(lan !== deflan && lan !== "all"){
			for (let key in bodyObj){
				saveObj.set(`${key}.${lan}`, bodyObj[key])
			}
			saveObj.set(`language.${lan}`, "yes")

		}else {
			for (let key in bodyObj){
				if(lan === "all" && !unchKeys.includes(key)){
					languages.forEach( l => {
						if(!bodyObj[key][l]){
							throw new ErrorResponse(`Please, add ${key} field in ${l} language`, 400);
						}
					})
				}
				saveObj[key] = bodyObj[key]
			}
			if(lan !== "all"){
				saveObj.language = "yes";
			}else {
				languages.forEach(l => saveObj.set(`language.${l}`, "yes"))
			}
		};

		if(bodyObj.categoryParent){
			const id = await checkCategory(bodyObj.categoryParent, lan);

			if(!id){
				throw new ErrorResponse(`At first add the parent category or add a title on ${lan} of it`, 400);
			};
			saveObj.categoryParent = id;

		};
		if(bodyObj.category){
			const id = await checkCategory(bodyObj.category, lan);
			if(!id){
				throw new ErrorResponse(`At first add the category or add a title on ${lan} of it`, 400);
		};
			saveObj.category = id;
		};
		return saveObj

	}catch (e) {
		next(e)
	}

}