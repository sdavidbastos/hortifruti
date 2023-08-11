const { faker } = require("@faker-js/faker");

class MarketBuilder {

    constructor() {
        this.market = {
            id: faker.string.uuid(),
            name: faker.company.name(),
            cnpj: faker.string.uuid(),
        }
    }

    build() {
        return this.market
    }
}

module.exports = { MarketBuilder }