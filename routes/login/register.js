const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LoginShema = require('../../models/login/login');

module.exports = (app) => {
    app.get("/register", async (req, res) => {
        res.send('register page')
        }
    );

    app.post("/register", async (req, res) => {
        let { login, password } = req.body;
        console.log(req.body.login);

        try {
            const user = await LoginShema.findOne({ login });
            console.log(user);
            // if (user) {
            //     const email = "Пользователь с таким email уже зарегистрирован!";
            //     return res.status(400).json(email);
            // }

                const newUser = new LoginShema({ login, password });
                console.log(newUser);
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, async (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;

                        try {
                            const user = await newUser.save();

                            const payload = {
                                id: user._id,
                                someInfo: 'hi',
                                login: user.login,
                                password: user.password
                            };

                            jwt.sign(
                                payload,
                                config.secret,
                                { expiresIn: 3600 * 24 * 30 },
                                (err, token) => {
                                    res.cookie("jwt", token);
                                    return res.json({ token, user: payload });
                                }
                            );
                        } catch (e) {
                            return res.json({ error: "Ошибка" });
                        }
                    });
                });
            } catch (e) {
            return res.send({ error: "Ошибка" });
        }
});
}
