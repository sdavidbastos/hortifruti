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
            const market = await this.client.market.findUnique({
                where: {
                    userId: user.id
                }
            })
            const product = await this.client.product.create({
                data: {
                    ...data,
                    market: {
                        connect: {
                            id: market.id
                        }
                    },
                }
            })

            return HttpResponse.ok(product);
        } catch (error) {
            console.log("error => ", error)
            return HttpResponse.serverError()
        }
    }
}

module.exports = { CreateProductUseCase }