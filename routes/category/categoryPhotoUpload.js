const Category = require("../../models/Category");
const asyncHandler = require("../../middleware/async");
const ErrorResponse = require('../../utils/errorResponse');
const path = require("path");
const key = require("../../configs/upload");
const { protect } = require("../../middleware/auth");

module.exports = (app) => {
	app.put("/categories/:id/photo", protect, asyncHandler(async (req, res, next) => {
		const id = req.params.id;

		const category = await Category.findById(id);

		if (!category) {
			return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
		};
		if (!req.files) {
			return next(new ErrorResponse(`Please upload a file`, 400));
		}

		const file = req.files.file;

		// Make sure the image is a photo
		if (!file.mimetype.startsWith('image')) {
			return next(new ErrorResponse("Please upload an image file", 400));
		}
		// Check filesize
		if (file.size > key.MAX_SIZE_UPLOAD) {
			return next(new ErrorResponse(`Please upload an image less than ${key.MAX_SIZE_UPLOAD}`,400));
		}
		// Create custom filename
		file.name = `photo_${category.uniqueCC}${path.parse(file.name).ext}`;
		const arrPhoto = category.photo;
		if(arrPhoto.includes(file.name)){
			return next(new ErrorResponse("Photo with this name exists", 400));
		};

		file.mv(`${key.FILE_UPLOAD_PATH}/${file.name}`, async err => {
			if (err) {
				console.error(err);
				return next(new ErrorResponse("Problem with file upload", 500));
			};

			arrPhoto.push(file.name);

			await Category.findByIdAndUpdate(id, { photo: arrPhoto });
			const data = await Category.findById(id);

			res.status(201).json({
				success: true,
				data
			});

		});

	}))
}