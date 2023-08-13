const request = require('supertest')

const app = require("../../src/config/app")
const client = require("../../src/database/prisma-client")
const { HelperFactory } = require('../../src/utils/helpers')
const { UserBuilder } = require('../builders')

describe('User Login Route Test Suite', () => {
    const { token, encrypter } = HelperFactory.execute()
    const user = new UserBuilder().build()

    test('should return token', async () => {
        const password = await encrypter.hash(user.password)
        await client.user.create({ data: { ...user, password } })
        const data = { email: user.email, password: user.password }
        const { body } = await request(app)
            .post('/api/login')
            .send({ data });
        const decoded = await token.verify(body.authorization)
        expect(user.id).toEqual(decoded.id)

    });
})
