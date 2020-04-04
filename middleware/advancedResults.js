const advancedResults = (model, popModel, path, select) => async (req, res, next) => {
  const defaultLanguage = model.getDefaultLanguage();
  const languages = model.getLanguages();

  let query;
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  //Unchangeable keys
  const unchKeys = ["uniquePC", "uniqueCC", "category", "OTC_RX", "categoryParent", "price", "photo", "author", "createdAt", `${path}`];

  //Modify object of query
  if(req.params.lan){
    unchKeys.forEach(param => delete reqQuery[param]);
    if(req.params.lan === "all"){
      reqQuery == {}
      languages.forEach(l =>{
		  const keyStr = `language.${l}`
		  reqQuery[keyStr] = "yes";
	  })
    }else {
      for(let key in reqQuery){
        const keyStr = `${key}.${req.params.lan}`;
        reqQuery[keyStr] = reqQuery[key];
        delete reqQuery[key];
      };
      const keyStr = `language.${req.params.lan}`
      reqQuery[keyStr] = "yes";
    };
    unchKeys.forEach(param => {
      if (req.query[param]){
        reqQuery[param] = req.query[param]
      }
    });
  };



  if(path && req.query[path]){
    const findObj ={};
    if(req.params.lan && req.params.lan !== "all"){
      const str = `${select}.${req.params.lan}`
      findObj[str] = reqQuery[path];
      const res = await popModel.findOne(findObj);
      if(res){
        reqQuery[path] = res._id;
      }else {
        delete reqQuery[path]
      }

    }else if(req.params.lan === "all"){
		delete reqQuery[path]
	}else if(!req.params.lan){
      findObj[path] = reqQuery[path];
      const res = await popModel.findOne(findObj);

      if(res){
        reqQuery[path] = res._id;
      }else {
        delete reqQuery[path]
      }
    }
  };

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc) GET /..?field[gt|gte|lt|lte|in]="something"
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  const modReqQuery = JSON.parse(queryStr);

  //Find by substr GET / ...?field=*substr
  for(let key in modReqQuery){
    if(String(modReqQuery[key]).startsWith("*")){
      const sub = modReqQuery[key].slice(1);
      modReqQuery[key] = new RegExp(`${sub}`, "i");
    }
  };

  // Finding resource
  query =  model.find(modReqQuery);

  // Select Fields GET /..?select=field1:field2
  if (req.query.select) {
    const fields = req.query.select.split(':');
    query = query.select(fields.join(" "));
  };
  let locale = defaultLanguage;
  if(req.params.lan && req.params.lan !== "all"){
    locale = req.params.lan;
  }

  // Sort GET /..?sort=field:desc
  if (req.query.sort) {
    let sortBy = "";
    const parts = req.query.sort.split(':');
    if(req.params.lan !== "all" && !unchKeys.includes(parts[0])){
      const value = parts[0];
      parts[0] = `${value}.${req.params.lan}`
    }
    sortBy = parts[1] === 'desc' ? `-${parts[0]}` : `${parts[0]}`;
    query = query.sort(sortBy).collation( { locale: `${locale}`, strength: 2 });
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (path) {
    query = query.populate({path: path, select: select});
  }

  // Executing query
  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  };

  next();
};

module.exports = advancedResults;
