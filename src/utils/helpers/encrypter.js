const MissingParamError = require('../errors/missing-param-error')

class Encrypter {
  constructor({ cryptor }) {
    this.cryptor = cryptor
  }
  async compare(value, hash) {
    if (!value) {
      throw new MissingParamError('value')
    }
    if (!hash) {
      throw new MissingParamError('hash')
    }
    return await this.cryptor.compare(value, hash)
  }

  async hash(value) {
    if (!value) {
      throw new MissingParamError('value')
    }
    return await this.cryptor.hash(value, 10)
  }
}

module.exports = { Encrypter }