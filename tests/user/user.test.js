const request = require('supertest')
const app = require("../../src/config/app")
const client = require("../../src/database/prisma-client");
const { MissingParamError, InvalidParamError } = require('../../src/utils/errors');
const { HelperFactory } = require('../../src/utils/helpers');
const { UserBuilder } = require('../builders');

describe('User Route Test Suite', () => {
    const { token } = HelperFactory.execute()
    
    test('should create user', async () => {
        const user = new UserBuilder().build()
        const response = await request(app)
            .post('/api/user')
            .send({ data: user });
        const decodePayload = await token.verify(response.body);
        expect(user.id).toEqual(decodePayload.id)
        expect(response.status).toBe(200)
    });

    test('should throw execption if email is alredy registered', async () => {
        const user = new UserBuilder().build()
        await client.user.create({ data: user })
        const response = await request(app)
            .post('/api/user')
            .send({ data: user });
        expect(response.body.error).toEqual(new InvalidParamError('already registered email').message)
        expect(response.status).toBe(400)
    });

    test('should throw execption if email invalid', async () => {
        const user = new UserBuilder().setEmail("").build()
        const response = await request(app)
            .post('/api/user')
            .send({ data: user });

        expect(response.body.error).toEqual(new MissingParamError('email').message)
        expect(response.status).toBe(400)
    });
    test('should throw execption if password invalid', async () => {
        const user = new UserBuilder().setPassword("").build()
        const response = await request(app)
            .post('/api/user')
            .send({ data: user });

        expect(response.body.error).toEqual(new MissingParamError('password').message)
        expect(response.status).toBe(400)
    });
});
