const Token = require("../../src/utils/helpers/token");
const jwt = require("jsonwebtoken")

describe('token-generator Test Suite', () => {

  const tokenGenerator = new Token({ secret: "secret", generator: jwt, expiresIn: "1s" })
  const id = "34037440-493d-45d3-96eb-a6109b1ad40c"

  test('should return token', async () => {
    const token = await tokenGenerator.generate(id)
    expect("result").toBe(token)
  });

  test('should return payload', async () => {
    const token = await tokenGenerator.generate(id)
    const payload = await tokenGenerator.verify(token)
    const result = payload.exp - payload.iat
    expect(payload.id).toBe(id)
    expect(1).toBe(result)
  });

})