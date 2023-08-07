const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { secret } = require("../../config/env")
const { Encrypter } = require("./encrypter")
const { Token } = require("./token")

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

module.exports = { HelperFactory }