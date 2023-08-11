const { ExpressAdapter } = require('../adapters/express.js');
const { createProductUseCase, authUseCase, listProductUseCase } = require('../domain/index.js');

const productRoutes = require('express').Router();

productRoutes.use(ExpressAdapter.execute(authUseCase))
productRoutes.post('/product', ExpressAdapter.execute(createProductUseCase));
productRoutes.get('/product/:id', ExpressAdapter.execute(listProductUseCase));

module.exports = { productRoutes }