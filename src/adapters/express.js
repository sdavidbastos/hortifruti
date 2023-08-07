class ExpressAdapter {
  static execute(useCase) {
    return async (req, res, next) => {
      const httpResponse = await useCase.execute(req)
      if (httpResponse) {
        return res.status(httpResponse.statusCode).json(httpResponse.body)
      }
      next()
    }
  }
}

module.exports = { ExpressAdapter }