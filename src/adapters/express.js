class ExpressAdapter {
  static execute(useCase) {
    return async (req, res, next) => {
      const httpRequest = {
        headers: req.headers,
        body: req.body
      }
      const httpResponse = await useCase.execute(httpRequest)
      if (httpRequest) {
        return res.status(httpResponse.statusCode).json(httpResponse.body)
      }
      next()
    }
  }
}

module.exports = ExpressAdapter