const { HttpResponse } = require("../../../utils/helpers/http-response");

class ListProductUseCase {
    constructor({ client }) {
        this.client = client
    }
    async execute(httpRequest) {
        try {
            const { id } = httpRequest.params
            const product = await this.client.product.findUnique({
                where: {
                    id
                }
            });

            return HttpResponse.ok(product);
        } catch (error) {
            return HttpResponse.serverError()
        }
    }
}

module.exports = { ListProductUseCase }