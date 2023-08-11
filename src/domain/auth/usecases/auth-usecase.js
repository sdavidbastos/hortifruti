const { HttpResponse } = require("../../../utils/helpers/http-response");

class AuthUseCase {
    constructor({ token, client }) {
        this.token = token
        this.client = client
    }

    async execute(httpRequest) {
        try {
            const authToken = httpRequest.headers.authorization;
            const { id } = await this.token.verify(authToken)
            const user = await this.client.user.findUnique({
                where: {
                    id: id
                },
                include: { market: true }
            })
            if (!user) {
                return HttpResponse.unauthorizedError()
            }
            const { password, ...userWithoutPassword } = user
            httpRequest.body.user = userWithoutPassword
        } catch (error) {
            if (error.name === "TokenExpiredError") return HttpResponse.unauthorizedError()
            return HttpResponse.serverError()
        }
    }
}

module.exports = { AuthUseCase }