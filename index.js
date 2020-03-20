const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");

const errorHandler = require("./middleware/error");

const routes = require("./routes/routes");
const db = require("./configs/db").mongoURI;

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

// File uploading
app.use(fileupload());

mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

mongoose.connection.once('open', () => {
	console.log('Connect to MongoDB success');
	routes(app);
	app.use(errorHandler);
	const PORT = process.env.PORT || 5000;

	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`)
	});
});



