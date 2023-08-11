const request = require('supertest')
const app = require("../../src/config/app")
const { ProductBuilder, MarketBuilder, UserBuilder } = require('../builders');
const { HelperFactory } = require('../../src/utils/helpers');
const client = require('../../src/database/prisma-client');

describe('Product Route Test Suite', () => {
    const { token } = HelperFactory.execute()
    let authorization
    const user = new UserBuilder().setRole("PRODUCER").build()
    const market = new MarketBuilder().build()
    const product = new ProductBuilder().build()
    beforeAll(async () => {
        [authorization] = await Promise.all([
            token.create(user.id),
            client.user.create({ data: { ...user } }),
            client.market.create({ data: { ...market, user: { connect: { id: user.id } } } })
        ])
    })
    test('should return new product', async () => {
        client.product.findUnique()
        const response = await request(app)
            .post('/api/product')
            .set('Authorization', authorization)
            .send({ data: product });

        expect(response.body).toEqual(expect.objectContaining(product))
        expect(response.statusCode).toBe(200)

    })

    test('should return list of products', async () => {
        const response = await request(app)
            .get(`/api/product/${product.id}`)
            .set('Authorization', authorization)

        expect(response.body).toEqual(expect.objectContaining(product))
        expect(response.statusCode).toBe(200)
    })

});
