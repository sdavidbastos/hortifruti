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
            const { name, password, email } = httpRequest.body;
            if (!email) {
                return HttpResponse.badRequest(new MissingParamError('email'))
            }
            if (!password) {
                return HttpResponse.badRequest(new MissingParamError('password'))
            }
            const userAlredyExists = await this.client.user.findUnique({
                where: {
                    email: email,
                },
            })
            if (userAlredyExists) {
                return HttpResponse.badRequest(new InvalidParamError('already registered email'))
            }
            const hashPassword = await this.encrypt.hash(password);
            const user = await this.client.user.create({
                data: {
                    name, password: hashPassword, email
                },
            });
            const token = await this.token.create(user.id)
            return HttpResponse.ok(token);
        } catch (error) {
            return HttpResponse.serverError()
        }
    }
}

module.exports = { CreateUserUseCase }