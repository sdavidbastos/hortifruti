const { MissingParamError } = require("../../../utils/errors");
const { HttpResponse } = require("../../../utils/helpers/http-response");

class CreateMarketUseCase {
    constructor({ client }) {
        this.client = client
    }
    async execute(httpRequest) {
        try {
            const { user, data } = httpRequest.body;
            if (user.role === "ADMIN" || user.role === "PRODUCER") {
                if (!data.name) {
                    return HttpResponse.badRequest(new MissingParamError('name'))
                }
                if (!data.cnpj) {
                    return HttpResponse.badRequest(new MissingParamError('cnpj'))
                }

                const market = await this.client.market.create({
                    data: {
                        ...data,
                        user: {
                            connect: { id: user.id }
                        }
                    }
                });

                return HttpResponse.ok(market);
            }
            return HttpResponse.unauthorizedError()
        } catch (error) {
            return HttpResponse.serverError()
        }
    }
}

module.exports = { CreateMarketUseCase }