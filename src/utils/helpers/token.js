const MissingParamError = require('../errors/missing-param-error')

class Token {
    constructor({ secret, token, expiresIn = "24h" }) {
        this.secret = secret
        this.token = token
        this.expiresIn = expiresIn
    }

    async create(id) {
        if (!this.secret) {
            throw new MissingParamError('secret')
        }
        if (!id) {
            throw new MissingParamError('id')
        }
        return this.token.sign({ id: id }, this.secret, { expiresIn: this.expiresIn })
    }

    async verify(token) {
        return this.token.verify(token, this.secret);
    }

}

module.exports = { Token }