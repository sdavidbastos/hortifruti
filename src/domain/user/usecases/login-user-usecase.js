const { MissingParamError, InvalidParamError } = require("../../../utils/errors");
const { HttpResponse } = require("../../../utils/helpers/http-response");



class LoginUserUseCase {
    constructor({ client, token, encrypt }) {
        this.client = client
        this.token = token
        this.encrypt = encrypt
    }
    async execute(httpRequest) {
        try {
            const { password, email } = httpRequest.body;

            if (!email) {
                return HttpResponse.badRequest(new MissingParamError('email'))
            }
            if (!password) {
                return HttpResponse.badRequest(new MissingParamError('password'))
            }
            const user = await this.client.user.findUnique({
                where: {
                    email: email,
                },
            })

            const passIsValid = await this.encrypt.compare(password, user.password);
            if (!user || !passIsValid) {
                return HttpResponse.badRequest(new InvalidParamError('email or password'))
            }
            const token = await this.token.create(user.id)
            return HttpResponse.ok(token);
        } catch (error) {
            return HttpResponse.serverError()
        }
    }
}

module.exports = { LoginUserUseCase }