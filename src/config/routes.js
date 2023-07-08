const userRoute = require("../user/route.js")

module.exports = app => {
    app.use("/api", userRoute)
}