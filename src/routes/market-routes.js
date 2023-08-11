const { ExpressAdapter } = require('../adapters/express.js');
const { authUseCase, createMarketUseCase, listMarketProductsUseCase } = require("../domain")

const marketRoutes = require('express').Router();

marketRoutes.use(ExpressAdapter.execute(authUseCase))
marketRoutes.post('/market', ExpressAdapter.execute(createMarketUseCase));
marketRoutes.get('/market/:id', ExpressAdapter.execute(listMarketProductsUseCase))

module.exports = { marketRoutes }