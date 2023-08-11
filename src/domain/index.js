const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const client = require("../database/prisma-client")
const { secret } = require("../config/env.js")
const { Token } = require('../utils/helpers/token')
const { Encrypter } = require('../utils/helpers/encrypter')
const { AuthUseCase } = require('./auth/usecases/auth-usecase')
const { CreateUserUseCase, LoginUserUseCase } = require('./user/usecases')
const { CreateMarketUseCase, ListMarketProductsUseCase } = require('./market/usecases/')
const { CreateProductUseCase, ListProductUseCase } = require('./product/usecases/')

const token = new Token({ secret, token: jwt })
const encrypt = new Encrypter({ cryptor: bcrypt })

const createMarketUseCase = new CreateMarketUseCase({ client })
const authUseCase = new AuthUseCase({ client, token })
const createUserUseCase = new CreateUserUseCase({ client, encrypt, token })
const loginUserUseCase = new LoginUserUseCase({ client, encrypt, token })
const createProductUseCase = new CreateProductUseCase({ client })
const listProductUseCase = new ListProductUseCase({ client })
const listMarketProductsUseCase = new ListMarketProductsUseCase({ client })

module.exports = {
    createMarketUseCase,
    authUseCase,
    createUserUseCase,
    loginUserUseCase,
    createProductUseCase,
    listProductUseCase,
    listMarketProductsUseCase
}