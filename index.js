const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require('./routes/routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = require('./configs/db').mongoURI;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection.on('error', (err) => {
    console.log('Connection error:', err)
});

mongoose.connection.once('open', () => {
    console.log('Connect to MongoDB success');
    routes(app);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Оно живо! PORT=${PORT}`, new Date());
    });
});
