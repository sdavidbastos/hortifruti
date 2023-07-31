const request = require('supertest')
const app = require("../../src/config/app")
const client = require("../../src/database/prisma-client");
const { MissingParamError, InvalidParamError } = require('../../src/utils/errors');
const HelperFactory = require('../../src/utils/helpers/factory');

describe('User Route Test Suite', () => {
    const {token} = HelperFactory.execute()
    afterEach(async () => {
        await client.user.deleteMany();
    });
    test('should create user', async () => {
        const data = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123'
        }
        const response = await request(app)
            .post('/api/user')
            .send(data);
        const { id } = await client.user.findUnique({
            where: {
                email: data.email
            }
        })
        const decodePayload = await token.verify(response.body)
        expect(id).toEqual(decodePayload.id)
        expect(response.status).toBe(200)
    });

    test('should throw execption if email is alredy registered', async () => {
        const data = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123'
        }
        await client.user.create({ data })
        const response = await request(app)
            .post('/api/user')
            .send(data);
        expect(response.body.error).toEqual(new InvalidParamError('already registered email').message)
        expect(response.status).toBe(400)
    });

    test('should throw execption if email invalid', async () => {
        const data = {
            name: 'John Doe',
            email: '',
            password: 'password123'
        }
        const response = await request(app)
            .post('/api/user')
            .send(data);

        expect(response.body.error).toEqual(new MissingParamError('email').message)
        expect(response.status).toBe(400)
    });
    test('should throw execption if password invalid', async () => {
        const data = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: ''
        }
        const response = await request(app)
            .post('/api/user')
            .send(data);

        expect(response.body.error).toEqual(new MissingParamError('password').message)
        expect(response.status).toBe(400)
    });
});
