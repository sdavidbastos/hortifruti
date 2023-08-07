const { userRoutes, marketRoutes, productRoutes } = require("../routes")
const api = "/api"

module.exports = app => {
    app.use(api, userRoutes)
    app.use(api, marketRoutes)
    app.use(api, productRoutes)
}