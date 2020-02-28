const {Schema, model} = require("mongoose");

const loginShema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = model("Login", loginShema);