const { MissingParamError, InvalidParamError } = require("../../../utils/errors");
const { HttpResponse } = require("../../../utils/helpers/http-response");

class CreateUserUseCase {
    constructor({ client, encrypt, token }) {
        this.client = client
        this.encrypt = encrypt
        this.token = token
    }
    async execute(httpRequest) {
        try {
            const { data } = httpRequest.body;
            if (!data.email) {
                return HttpResponse.badRequest(new MissingParamError('email'))
            }
            if (!data.password) {
                return HttpResponse.badRequest(new MissingParamError('password'))
            }
            const userAlredyExists = await this.client.user.findUnique({
                where: {
                    email: data.email,
                },
            })
            if (userAlredyExists) {
                return HttpResponse.badRequest(new InvalidParamError('already registered email'))
            }
            const hashPassword = await this.encrypt.hash(data.password);
            const [token] = await Promise.all([
                this.token.create(data.id),
                this.client.user.create({
                    data: {
                        ...data, password: hashPassword
                    },
                }),
            ])
            return HttpResponse.ok(token);
        } catch (error) {
            return HttpResponse.serverError()
        }
    }
}

module.exports = { CreateUserUseCase }