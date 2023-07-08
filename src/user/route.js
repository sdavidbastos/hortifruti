const { Router } = require('express');
const client = require("../database/prisma-client.js")
const CreateUserController = require('./usecases/create-user-usecase.js');
const Encrypt = require("../utils/helpers/encrypter.js");
const ExpressRouterAdapter = require('../adapters/express.js');
const route = Router();

const encrypt = new Encrypt();
const createUserController = new CreateUserController({ client, encrypt });


route.post('/users', ExpressRouterAdapter.adapt(createUserController));

module.exports = route