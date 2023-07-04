import { UserController } from "./controller.js";
import { User } from "./model.js";
import { UserService } from "./service.js";

export class FactoryUser {
    static execute() {
        const userService = new UserService(User)
        const userController = new UserController(userService)
        return {userService, userController }
    }
}