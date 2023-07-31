const request = require('supertest')

const HelperFactory = require("../../src/utils/helpers/factory");
const app = require("../../src/config/app")
const client = require("../../src/database/prisma-client")

describe('User Login Route Test Suite', () => {
    const { token, encrypter } = HelperFactory.execute()
    let user
    beforeAll(async () => {
        const password = await encrypter.hash("teste")
        const data = {
            name: "teste",
            password,
            email: "teste@teste.com"
        }
       user = await client.user.create({ data });
    });

    afterAll(async () => {
        await client.user.deleteMany();
    });

    test('should return token', async () => {
        const input = { email: "teste@teste.com", password: "teste" }
        const { body } = await request(app)
            .post('/api/login')
            .send(input);
        const decoded = await token.verify(body)
        expect(user.id).toEqual(decoded.id)

    });
})
