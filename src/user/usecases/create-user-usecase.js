const { InvalidParamError } = require("../../utils/errors");
const MissingParamError = require("../../utils/errors/missing-param-error");
const HttpResponse = require('../../utils/helpers/http-response')

module.exports = class CreateUserUseCase {
    constructor({ client, encrypt }) {
        this.client = client
        this.encrypt = encrypt
    }
    async execute(httpRequest) {
        try {
            const { username, password, email } = httpRequest.body;
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
                    username, password: hashPassword, email
                },
            });
            return HttpResponse.ok(user);
        } catch (error) {
            return HttpResponse.serverError()
        }
    }
}