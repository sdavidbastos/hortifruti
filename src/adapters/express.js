module.exports = class ExpressRouterAdapter {
    static adapt (useCase) {
      return async (req, res) => {
        const httpRequest = {
          body: req.body
        }
        const httpResponse = await useCase.execute(httpRequest)
        res.status(httpResponse.statusCode).json(httpResponse.body)
      }
    }
  }
  