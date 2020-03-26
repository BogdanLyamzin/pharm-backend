const advancedResults = (model, popModel, path) => async (req, res, next) => {

  let query;
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  //Unchangeable keys
  const unchKeys = ["uniquePC", "uniqueCC", "category", "categoryParent", "price", "photo", "author", "createdAt"];

  //Modify object of query
  if(req.params.lan){
    unchKeys.forEach(param => delete reqQuery[param]);
    if(req.params.lan !== "all"){
      for(let key in reqQuery){
        const keyStr = `content.${req.params.lan}.${key}`;
        reqQuery[keyStr] = reqQuery[key];
        delete reqQuery[key];
      };
      reqQuery[req.params.lan] = true;
    }
    unchKeys.forEach(param => {
      if (req.query[param]){
        reqQuery[param] = req.query[param]
      }
    });
  }

  if(path && req.query[path]){
    const findObj ={};
    if(req.params.lan && req.params.lan !== "all"){
      const str = `content.${req.params.lan}.title`
      findObj[str] = reqQuery[path];
      const res = await popModel.findOne(findObj);
      if(res){
        reqQuery[path] = res._id;
      }else {
        delete reqQuery[path]
      }

    }else if(!req.params.lan){
      findObj[path] = reqQuery[path];
      const res = await popModel.findOne(findObj);

      if(res){
        reqQuery[path] = res._id;
      }else {
        delete reqQuery[path]
      }
    }
  }

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc) GET /..?field[gt|gte|lt|lte|in]="something"
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource

  query =  model.find(JSON.parse(queryStr));

  // Select Fields GET /..?select=field1:field2
  if (req.query.select) {
    const fields = req.query.select.split(':');
    if(req.params.lan ){

      fields.forEach((field, index) => {
        if(unchKeys.includes(field)){
          fields[index] = field;
        }else {
          if(req.params.lan !== "all"){
            fields[index] = `content.${req.params.lan}.${field}`;
          }else {
            fields[index] = `content.ua.${field}`;
            fields[fields.length + 1] = `content.ru.${field}`;
          }
        }
      })
    }
    query = query.select(fields.join(" "));
  }

  //	Locale
  let locale = "ru";
  if(req.params.lan === "ua" ){
    locale = "uk"
  }

  // Sort GET /..?sort=field:desc
  if (req.query.sort) {
    let sortBy = "";
    const parts = req.query.sort.split(':');
    if(req.params.lan !== "all" && !unchKeys.includes(parts[0])){
      const value = parts[0];
      parts[0] = `content.${req.params.lan}.${value}`
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
    query = query.populate(path);
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
