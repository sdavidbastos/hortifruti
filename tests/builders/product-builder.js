const { faker } = require("@faker-js/faker");

class ProductBuilder {

    constructor() {
        this.product = {
            id: faker.string.uuid(),
            name: faker.company.name(),
            price: +faker.commerce.price({ max: 100, min: 15 }),
        }
    }

    build() {
        return this.product
    }
}

module.exports = { ProductBuilder }