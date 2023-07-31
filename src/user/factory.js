const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const client = require("../database/prisma-client")
const { secret } = require("../config/env.js")
const { CreateUserUseCase, GetUserUseCase, LoginUserUseCase } = require('./usecases');
const { Encrypter, Token } = require("../utils/helpers/");

class UserFactory {
    static execute() {
        const token = new Token({ token: jwt, secret })
        const encrypt = new Encrypter({ cryptor: bcrypt });
        return {
            createUserUseCase: new CreateUserUseCase({ client, encrypt, token }),
            getUserUseCase: new GetUserUseCase({ client }),
            loginUserUseCase: new LoginUserUseCase({ client, token, encrypt })
        }
    }
}

module.exports = UserFactory