import { Hono } from 'hono';

import { UserController } from '@/controllers/user';

export const userRoutes = new Hono();

userRoutes.get('/', UserController.getUsers);
userRoutes.get('/:id', UserController.getUserById);
userRoutes.get('/type/:type_id', UserController.getUsersByType);
userRoutes.post('/', UserController.createUser);
userRoutes.put('/:id', UserController.updateUser);
userRoutes.delete('/:id', UserController.deleteUser);
