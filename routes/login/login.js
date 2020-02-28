const LoginShema = require('../../models/login/login');

module.exports = (app)=> {
    app.post("/login", async (req, res) => {

        const user = {
            login: req.body.login,
            password: req.body.password
        };

        try {
            const result = await LoginShema.findOne(user);
            res.send({
                status: "Success",
                result: {
                    login: result.login,
                    id: result._id,
                }
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