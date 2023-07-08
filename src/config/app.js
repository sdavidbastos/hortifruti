const express = require("express")
const setupApp = require("./setup.js")
const routes = require("./routes.js")
const app = express()

setupApp(app)
routes(app)

module.exports = app
