const { HttpResponse } = require("../../../utils/helpers/http-response");

class ListMarketProductsUseCase {
    constructor({ client }) {
        this.client = client
    }
    async execute(httpRequest) {
        try {
            const { id } = httpRequest.params
            const products = await this.client.product.findMany({
                where: {
                    marketId: id
                }
            })
            return HttpResponse.ok(products)
        } catch (error) {
            return HttpResponse.serverError()
        }
    }
}

module.exports = { ListMarketProductsUseCase }