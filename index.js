const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
cookieParser = require('cookie-parser');
const passport = require('passport');
const mongooseIntl = require('mongoose-intl');
const langueges = require('./config/languages')

const app = express();

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')(passport);

app.use(cors());
app.use(bodyParser.json());
mongoose.plugin(mongooseIntl, langueges);
const routes = require("./routes/");

const db = require('./config/db').mongoURI;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

mongoose.connection.once('open', () => {
    console.log('Connect to MongoDB success');
    routes(app);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Оно живо! PORT=${PORT}`)
    });
});

