const UserFactory = require("./factory")
const ExpressAdapter = require('../adapters/express.js');

const route = require('express').Router();
const { createUserUseCase, getUserUseCase, loginUserUseCase } = UserFactory.execute()

route.post('/user', ExpressAdapter.execute(createUserUseCase));
route.get('/user', ExpressAdapter.execute(getUserUseCase));

route.post('/login', ExpressAdapter.execute(loginUserUseCase));

module.exports = route