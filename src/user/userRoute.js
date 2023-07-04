import { Router } from 'express';
import { FactoryUser } from './factory.js';

export const userRoute = Router();
const { userController } = FactoryUser.execute();

userRoute.get('/', userController.index.bind(userController));

// Rota para criar um novo usuário
userRoute.post('/', userController.store.bind(userController));

