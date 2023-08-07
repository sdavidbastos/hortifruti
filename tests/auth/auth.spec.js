const client = require("../../src/database/prisma-client");
const { AuthUseCase } = require("../../src/domain/auth/usecases/auth-usecase");
const { HelperFactory } = require("../../src/utils/helpers");
const { HttpResponse } = require("../../src/utils/helpers/http-response");
const { UserBuilder } = require("../builders");


describe('Auth Route Test Suite', () => {
    const { token } = HelperFactory.execute()
    const auth = new AuthUseCase({ token, client })

    test('should verify token and add in request', async () => {
        const data = new UserBuilder().build()
        const { password, ...user } = await client.user.create({ data })
        const payload = await token.create(data.id)
        const input = {
            body: {},
            headers: {
                authorization: payload
            }
        }
        await auth.execute(input);
        expect(input.body.user).toEqual(expect.objectContaining(user));
    })

    test('should return throw no authorization', async () => {
        const user = new UserBuilder().build()
        token.expiresIn = "1ms"
        const payload = await token.create(user.id)
        const input = {
            headers: {
                authorization: payload
            }
        }
        const output = await auth.execute(input)
        expect(HttpResponse.unauthorizedError()).toEqual(output)
    })
})