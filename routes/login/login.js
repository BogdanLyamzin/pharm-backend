const LoginShema = require('../../models/login/login');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config/db');

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
                        login: user.login,
                    };

                    const token = jwt.sign(
                        payload,
                        config.secret,
                        { expiresIn: config.tokenLife},
                    );

                    const refreshToken = jwt.sign(
                        payload,
                        config.secret,
                        { expiresIn: config.refreshTokenLife}
                    );

                    const response = {
                        status: "Ok",
                        token: 'JWT' + token,
                        refreshToken: refreshToken,
                        expiresIn: tokenLife
                    };

                    res.status(200).json(response);

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


