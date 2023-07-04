export class UserService {
    constructor(userModel) {
        this.userModel = userModel
    }
    
    async findAll() {
        const users = await this.userModel.findAll();
        if (users) { return users; }
        throw new Error('Error retrieving users');
    }

    async getById(id) {
        const user = await this.userModel.findByPk(id);
        if (user) { return user; }
        throw new Error('Error retrieving user');
    }

    async createUser(userData) {
        const user = await this.userModel.create(userData);
        if (user) { return user; }
        throw new Error('Error creating user');
    }
}
