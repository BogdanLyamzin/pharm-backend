const MenuItem = require('../../../models/menuItem');

module.exports = (app) => {
    app.put('/menus/:menuId/items/:id', async (req, res) => {

        const options = {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        };

        try {
            const result = await MenuItem.findByIdAndUpdate(req.params.id, req.body, options);

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
