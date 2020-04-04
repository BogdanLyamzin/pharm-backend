const Category = require("../models/Category");

module.exports = async function(title, lan){
	try {
		const objFind = {};
	    const languages = Category.getLanguages();

		if(lan !== "all"){
			const str = `title.${lan}`;
			objFind[str] = title;
		}else {
			languages.forEach(l => {
				const str = `title.${l}`
				objFind[str] = title[l]
			})
		}

		const category = await Category.find(objFind);

		if(category.length){
			return category[0]._id
		}
		return false
	}catch (err) {
		console.log(err.message)
	}
}
