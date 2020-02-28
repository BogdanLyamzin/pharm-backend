const LoginShema = require('../../models/login/login');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {secretOrKey} = require('../../config/db');

module.exports = (app)=> {
    app.post("/login", async (req, res) => {

        const {login, password} = req.body;

        try {
            const user = await LoginShema.findOne({login});
            if ( !user ) {
               return res.json({
                   status: "Error",
                   message: 'User not found'
               })
            }

            try {
                const isMatch = await bcrypt.compare(password, user.password);

                if ( isMatch ) {
                    const payload = {
                        id: user._id,
                        name: user.name,
                        login: user.login,
                        email: user.email
                    };

                    const token = jwt.sign(
                        payload,
                        secretOrKey,
                        { expiresIn: 3600 * 8},
                    );

                    res.json({
                        status: "Success",
                        token: 'JWT' + token,
                        user: payload
                    })
                } else {
                    return res.json({
                        status: "Error",
                        message: 'Incorrect password'
                    })
                }
            } catch (err) {
                return res.send({
                    status: "Error",
                    message: err.message
                })
            }
        } catch (err) {
            res.send({
                status: "Error",
                message: err.message
            })
        }
    });
};


