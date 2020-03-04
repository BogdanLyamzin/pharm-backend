const passport = require("passport");

module.exports = (app) => {
    app.get(
        "/current",
        passport.authenticate( "jwt", { session: false } ),
        ( req, res ) => {
            res.send('You are Authorized user')
        }
    )
}