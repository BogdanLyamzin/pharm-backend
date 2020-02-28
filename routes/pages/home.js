module.exports = (app) => {
    app.get("/", (req, res) => {
        res.send("Welcome home page!");
    });
};