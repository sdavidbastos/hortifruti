const userRoute = require("../user/route.js")
const api = "/api"
module.exports = app => {
    app.use(api, userRoute)
}