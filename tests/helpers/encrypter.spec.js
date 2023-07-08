const Encrypter = require("../../src/utils/helpers/encrypter");


describe('Helper Test Suite', () => {
  const encrypter = new Encrypter()
  test('authenticates with correct password', async () => {
    const password = 'password123';
    const hashedPassword = await encrypter.hash(password);
    const isAuthenticated = await encrypter.compare(password, hashedPassword);

    expect(isAuthenticated).toBe(true);
    expect(hashedPassword).not.toBe(password)
  });
})