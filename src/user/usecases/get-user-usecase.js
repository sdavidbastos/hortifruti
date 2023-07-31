const { InvalidParamError } = require("../../utils/errors");

class GetUserUseCase {
    constructor({ client }) {
        this.client = client
    }
    async execute(httpRequest) {
        try {
            const ids = [...httpRequest.body.id];
            const user = this.client.user.findMany({
                where: {
                    id: {
                        in: ids
                    },
                },
            })
            return HttpResponse.ok(user);
        } catch (error) {
            return HttpResponse.serverError()
        }
    }

}

module.exports = GetUserUseCase