const { ExpressAdapter } = require('../adapters/express.js');
const { createProductUseCase, authUseCase } = require('../domain/index.js');

const productRoutes = require('express').Router();

productRoutes.use(ExpressAdapter.execute(authUseCase))
productRoutes.post('/product', ExpressAdapter.execute(createProductUseCase));

module.exports = { productRoutes }