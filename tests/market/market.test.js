const request = require('supertest')
const app = require("../../src/config/app")
const { MarketBuilder } = require('../builders');
const { HelperFactory } = require('../../src/utils/helpers');
const client = require('../../src/database/prisma-client');

describe('Market Route Test Suite', () => {
    const { token } = HelperFactory.execute()
    test('should return new market', async () => {
        const { user, id, ...market } = new MarketBuilder().build()
        const [auth, _userCreated] = await Promise.all([token.create(user.id), client.user.create({ data: { ...user } })])
        const response = await request(app)
            .post('/api/market')
            .set('Authorization', auth)
            .send(market);

        expect(response.body).toEqual(expect.objectContaining({ ...market, userId: user.id }))
        expect(response.statusCode).toBe(200)
    })

});
