const { faker } = require("@faker-js/faker/locale/pt_BR")
class UserBuilder {
    constructor() {
        this.user = {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            password: faker.internet.password(),
            email: faker.internet.email({ firstName: this.fullName }),
            role: faker.helpers.arrayElement(['CONSUMER', 'PRODUCER', 'ADMIN']),
        };
    }

    setName(name) {
        this.user.name = name;
        return this;
    }

    setEmail(email) {
        this.user.email = email;
        return this;
    }

    setRole(role) {
        this.user.role = role;
        return this;
    }
    setPassword(password) {
        this.user.password = password
        return this
    }

    build() {
        return this.user;
    }
}


module.exports = { UserBuilder }