const Category = require("../models/Category");

module.exports = async function(title, lan){
	try {
		const objFind = {};
		objFind.content = {};
		objFind.content[lan] = {};
		objFind.content[lan].title = title;
		const category = await Category.find(objFind);
		if(category.length){
			return category[0]._id
		}
		return false
	}catch (err) {
		console.log(err.message)
	}
}
