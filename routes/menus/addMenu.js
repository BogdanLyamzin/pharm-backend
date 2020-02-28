const MenuModel = require('../../models/menu');

module.exports = (app) => {
    app.post('/menus', async (req, res) => {

        const menu = new MenuModel({
            menuTitle: req.body.menuTitle,
            id: req.body.id,
        });

        try {
            const result = await menu.save();

            res.send({
                status: "Success",
                result: result,
            });
        } catch (err) {
            res.send({
                status: "Error",
                message: err,
            });
        }
    });
};
