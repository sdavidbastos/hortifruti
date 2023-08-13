const request = require('supertest')
const app = require("../../src/config/app")
const client = require('../../src/database/prisma-client');
const { MarketBuilder, UserBuilder, ProductBuilder } = require('../builders');
const { HelperFactory } = require('../../src/utils/helpers');

describe('Market Route Test Suite', () => {
    const { token } = HelperFactory.execute()
    const user = new UserBuilder().setRole("PRODUCER").build()
    const market = new MarketBuilder().build()
    const products = [new ProductBuilder().build(), new ProductBuilder().build()]

    beforeAll(async () => {
        [authorization] = await Promise.all([
            token.create(user.id),
            client.user.create({ data: { ...user } }),
        ])
        await client.market.create({ data: { ...market, user: { connect: { id: user.id } } } });
        await Promise.all([
            client.product.create({ data: { ...products[0], market: { connect: { id: market.id } } } }),
            client.product.create({ data: { ...products[1], market: { connect: { id: market.id } } } })
        ])
    })
    test('should return new market', async () => {
        const producer = new UserBuilder().setRole("PRODUCER").build()
        const data = new MarketBuilder().build()
        const [auth] = await Promise.all([token.create(producer.id), client.user.create({ data: { ...producer } })])
        const response = await request(app)
            .post('/api/market')
            .set('Authorization', auth)
            .send({ data });

        expect(response.body).toEqual(expect.objectContaining({ ...data, userId: producer.id }))
        expect(response.statusCode).toBe(200)
    })

    test('should all products of market', async () => {

        const response = await request(app)
            .get(`/api/market/${market.id}`)
            .set('Authorization', authorization)

        expect(response.body).toEqual(expect.arrayContaining(products))
        expect(response.statusCode).toBe(200)
    })

    test('should a specific product of market', async () => {

        const response = await request(app)
            .get(`/api/market/${market.id}/${products[0].id}`)
            .set('Authorization', authorization)

        expect(response.body).toEqual(expect.arrayContaining([products[0]]))
        expect(response.statusCode).toBe(200)
    })

});
