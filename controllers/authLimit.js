const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 5,
    message:
        `You've made too many failed attempts in a short period of time, please try again after 15 minutes`,
});