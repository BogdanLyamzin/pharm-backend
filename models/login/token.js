const {Schema, model} = require("mongoose");

const TokenShema = new Schema({
    tokenId: String,
    userId: String
});

module.exports = model("Token", TokenShema);