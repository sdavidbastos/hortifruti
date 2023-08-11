const { MissingParamError } = require("../../../utils/errors");
const { HttpResponse } = require("../../../utils/helpers/http-response");

class CreateProductUseCase {
    constructor({ client }) {
        this.client = client
    }
    async execute(httpRequest) {
        try {
            const { data, user } = httpRequest.body;
            if (!data.name) {
                return HttpResponse.badRequest(new MissingParamError('name'))
            }
            if (!data.price) {
                return HttpResponse.badRequest(new MissingParamError('price'))
            }
            if (!user.market) {
                return HttpResponse.unauthorizedError()
            }
            const product = await this.client.product.create({
                data: {
                    ...data,
                    market: {
                        connect: {
                            id: user.market.id
                        }
                    },
                }
            })

            return HttpResponse.ok(product);
        } catch (error) {
            return HttpResponse.serverError()
        }
    }
}

module.exports = { CreateProductUseCase }