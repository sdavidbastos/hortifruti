const { faker } = require("@faker-js/faker");
const { MarketBuilder } = require("./market-builder");

class ProductBuilder {

    constructor() {
        this.product = {
            id: faker.string.uuid(),
            name: faker.company.name(),
            price: +faker.commerce.price({ max: 100, min: 15 }),
            market: new MarketBuilder().build()
        }
    }

    setName(name) {
        this.product.name = name;
        return this;
    }

    setMarket(user) {
        this.user = user;
        return this;
    }

    build() {
        return this.product
    }
}

module.exports = { ProductBuilder }