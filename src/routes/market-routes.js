const { ExpressAdapter } = require('../adapters/express.js');
const { authUseCase, createMarketUseCase } = require("../domain")

const marketRoutes = require('express').Router();

marketRoutes.use(ExpressAdapter.execute(authUseCase))
marketRoutes.post('/market', ExpressAdapter.execute(createMarketUseCase));

module.exports = { marketRoutes }