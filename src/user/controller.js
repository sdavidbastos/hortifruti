export class UserController {
    constructor(userService){
        this.userService = userService
    }

    async store(req, res) {
        const { username, email, password } = req.body;

        try {
            const user = await this.userService.createUser({ username, email, password });
            delete user.password
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ error: 'Error creating user' });
        }
    }

    async index(req, res) {
        try {
          const users = await this.userService.findAll();
          return res.json(users);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Error retrieving users' });
        }
      }
}
