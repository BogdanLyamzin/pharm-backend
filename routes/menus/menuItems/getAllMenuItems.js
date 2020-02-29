const MenuItem = require('../../../models/menuItem');

module.exports = (app) => {
    app.get('/menus:menuId/item', async (req, res) => {

        try {
            const result = await MenuItem.find(req.query);

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
