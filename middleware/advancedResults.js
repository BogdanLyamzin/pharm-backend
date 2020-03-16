const advancedResults = (model, popModel, path) => async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  if(path && reqQuery[path]){
   const findObj ={};
    findObj[path] = reqQuery[path];
    const res = await popModel.find(findObj);
    reqQuery[path] = res[0]._id;
  }

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc) GET /..?field[gt|gte|lt|lte|in]="something"
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource

  query =  model.find(JSON.parse(queryStr));

  // Select Fields GET /..?select=field1:field2
  if (req.query.select) {
    const fields = req.query.select.split(':').join(' ');
    query = query.select(fields);
  }

  // Sort GET /..?sort=field:desc
  if (req.query.sort) {
    let sortBy = "";
    const parts = req.query.sort.split(':');
    sortBy = parts[1] === 'desc' ? `-${parts[0]}` : `${parts[0]}`;
    query = query.sort(sortBy);
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
