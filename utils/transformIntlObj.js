
module.exports = (obj, lan) => {
	const populateFields = ["categoryParent", "category"];
	const unchKeys = ["_id", "uniquePC", "uniqueCC", "OTC_RX", "price", "photo", "author", "createdAt"];
	const fullList = [...populateFields, ...unchKeys];

	const trasformObj = {...obj._doc};
	fullList.forEach(f => delete trasformObj[f]);
	if(obj.categoryParent){
		trasformObj.categoryParent = obj.get("categoryParent.title");
	};
	if(obj.category){
		trasformObj.category = obj.get("category.title");
	}

	if(lan !== "all"){
		for(let key in trasformObj){
			trasformObj[key] = obj.get(`${key}.${lan}`);
		};
		if(obj._doc.categoryParent){
			trasformObj.categoryParent = obj.get(`categoryParent.title.${lan}`);
		};
		if(obj._doc.category){
			trasformObj.category = obj.get(`category.title.${lan}`);
		}
	}

	unchKeys.forEach(f =>{
		if(obj._doc[f]){
			trasformObj[f] = obj._doc[f];
		}});

	return trasformObj

}