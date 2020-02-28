const LoginShema = require('../../models/login/login');

module.exports = (app)=> {
    app.post("/login", async (req, res) => {

        const user = {
            login: req.body.login,
            password: req.body.password
        };

        try {
            const result = await LoginShema.find(req.query);
            res.send({
                status: "Success",
                reqQ: req.query,
                user,
                result
            })
        }
        catch (err) {
            res.send({
                status: "Error",
                message: err.message
            })
        }
    });
};