const { MissingParamError, InvalidParamError } = require("../../../utils/errors");
const { HttpResponse } = require("../../../utils/helpers/http-response");

class CreateMarketUseCase {
    constructor({ client }) {
        this.client = client
    }
    async execute(httpRequest) {
        try {
            const { user, name, cnpj } = httpRequest.body;
            if (user.role === "ADMIN" || user.role === "PRODUCER") {
                if (!name) {
                    return HttpResponse.badRequest(new MissingParamError('name'))
                }
                if (!cnpj) {
                    return HttpResponse.badRequest(new MissingParamError('cnpj'))
                }

                const market = await this.client.market.create({
                    data: {
                        name,
                        cnpj,
                        user: {
                            connect: { id: user.id }
                        }
                    }
                });

                return HttpResponse.ok(market);
            }
            return HttpResponse.unauthorizedError()
        } catch (error) {
            console.log("error => ", error)
            return HttpResponse.serverError()
        }
    }
}

module.exports = { CreateMarketUseCase }