const passport = require("passport");

module.exports = (app) => {
    app.get(
        "/current",
        passport.authenticate( "jwt", { session: false } ),
        ( req, res ) => {
            res.json( {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email
            } );
        }
    )
}