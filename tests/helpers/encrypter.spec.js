const bcrypt = require("bcrypt");
const { Encrypter } = require("../../src/utils/helpers/encrypter");

describe('encrypter Test Suite', () => {
  const encrypter = new Encrypter({cryptor: bcrypt})
  test('authenticates with correct password', async () => {
    const password = 'password123';
    const hashedPassword = await encrypter.hash(password);
    const isAuthenticated = await encrypter.compare(password, hashedPassword);

    expect(isAuthenticated).toBe(true);
    expect(hashedPassword).not.toBe(password)
  });
})