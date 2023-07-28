const request = require('supertest')
const app = require("../../src/config/app")
const client = require("../../src/database/prisma-client");
const { MissingParamError, InvalidParamError, ServerError } = require('../../src/utils/errors');

describe('User Route Test Suite', () => {
    afterEach(async () => {
        await client.user.deleteMany();
    });
    test('should create user', async () => {
        const data = {
            username: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123'
        }
        const response = await request(app)
            .post('/api/users')
            .send(data);

        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                username: expect.any(String),
                password: expect.any(String),
                updatedAt: expect.any(String),
                createdAt: expect.any(String),
            }))
        expect(response.status).toBe(200)
    });
    test('should login user', async () => {
         
    })
    test('should throw execption if email is alredy registered', async () => {
        const data = {
            username: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123'
        }
        await client.user.create({data})
        const response = await request(app)
            .post('/api/users')
            .send(data);
        expect(response.body.error).toEqual(new InvalidParamError('already registered email').message)
        expect(response.status).toBe(400)
    });

    test('should throw execption if email invalid', async () => {
        const data = {
            username: 'John Doe',
            email: '',
            password: 'password123'
        }
        const response = await request(app)
            .post('/api/users')
            .send(data);

        expect(response.body.error).toEqual(new MissingParamError('email').message)
        expect(response.status).toBe(400)
    });
    test('should throw execption if password invalid', async () => {
        const data = {
            username: 'John Doe',
            email: 'johndoe@example.com',
            password: ''
        }
        const response = await request(app)
            .post('/api/users')
            .send(data);

        expect(response.body.error).toEqual(new MissingParamError('password').message)
        expect(response.status).toBe(400)
    });

    test.skip('should throw inetrnal server error', async () => {
        await client.$disconnect()
        const data = {
            username: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123'
        }
        const response = await request(app)
            .post('/api/users')
            .send(data);

        expect(response.body.error).toEqual(new ServerError().message)
        expect(response.status).toBe(500)
    });
});
