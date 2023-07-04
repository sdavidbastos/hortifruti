import { FactoryUser } from "../../src/user/factory";

describe('Testes de criação de usuário', () => {
    let userService;

    beforeEach(() => {
        userService = FactoryUser.execute().userService
    });

    test('Deve criar um novo usuário', async () => {
        const userData = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123'
        };

        const createdUser = await userService.createUser(userData);

        expect(createdUser).toBeDefined();
        expect(createdUser.id).toBeDefined();
        expect(createdUser.name).toBe(userData.name);
        expect(createdUser.email).toBe(userData.email);

    });

    test('Deve retornar um erro ao criar um usuário com dados inválidos', async () => {
        const invalidUserData = {
            name: '',
            email: 'invalidemail',
            password: 'pass'
        };

        try {
            await userService.createUser(invalidUserData);
            fail('Esperava-se que createUser lançasse um erro');
        } catch (error) {
            expect(error.message).toBe('Dados inválidos do usuário');
        }
    });
});
