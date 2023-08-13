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
            const { data } = httpRequest.body;
            if (!data.email) {
                return HttpResponse.badRequest(new MissingParamError('email'))
            }
            if (!data.password) {
                return HttpResponse.badRequest(new MissingParamError('password'))
            }
            const user = await this.client.user.findUnique({
                where: {
                    email: data.email,
                },
            });
            const passIsValid = await this.encrypt.compare(data.password, user.password);

            if (!user || !passIsValid) {
                return HttpResponse.badRequest(new InvalidParamError('email or password'));
            }
            const token = await this.token.create(user.id)
            return HttpResponse.ok({ authorization: token });
        } catch (error) {
            return HttpResponse.serverError()
        }
    }
}

module.exports = { LoginUserUseCase }