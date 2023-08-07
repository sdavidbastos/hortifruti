const { faker } = require("@faker-js/faker");
const { UserBuilder } = require("./user-builder");

class MarketBuilder {

    constructor() {
        this.market = {
            id: faker.string.uuid(),
            name: faker.company.name(),
            cnpj: faker.string.uuid(),
            user: new UserBuilder().setRole("PRODUCER").build()
        }
    }

    setName(name) {
        this.market.name = name;
        return this;
    }

    setUser(user) {
        this.user = user;
        return this;
    }

    build() {
        return this.market
    }
}

module.exports = { MarketBuilder }