const bcrypt = require("bcrypt")
const Encrypter = require("./encrypter")
const Token = require("./token")
const { secret } = require("../../config/env")
const jwt = require("jsonwebtoken")

class HelperFactory {
    static execute() {
        const encrypter = new Encrypter({ cryptor: bcrypt })
        const token = new Token({ secret, token: jwt })
        return {
            encrypter,
            token
        }
    }
}

module.exports = HelperFactory