const { HelperFactory } = require("../../src/utils/helpers");

describe('token-generator Test Suite', () => {

  const { token } = HelperFactory.execute()
  const id = "34037440-493d-45d3-96eb-a6109b1ad40c"

  test('should return payload', async () => {
    const payload = await token.create(id)
    const decodedPayload = await token.verify(payload)
    const result = decodedPayload.exp - decodedPayload.iat
    expect(decodedPayload.id).toBe(id)
    expect(86400).toBe(result)
  });

})