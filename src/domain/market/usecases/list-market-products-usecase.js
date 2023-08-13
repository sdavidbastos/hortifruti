const { HttpResponse } = require("../../../utils/helpers/http-response");

class ListMarketProductsUseCase {
    constructor({ client }) {
        this.client = client
    }
    async execute(httpRequest) {
        try {
            const { marketId, id } = httpRequest.params
            const products = await this.client.product.findMany({
                where: {
                    marketId,
                    id
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                }
            })
            return HttpResponse.ok(products)
        } catch (error) {
            return HttpResponse.serverError()
        }
    }
}

module.exports = { ListMarketProductsUseCase }