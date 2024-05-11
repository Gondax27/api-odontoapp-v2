import { Hono } from 'hono';

import { UserTypeController } from '@/controllers/user_type';

export const userTypeRoutes = new Hono();

userTypeRoutes.get('/', UserTypeController.getUserTypes);
userTypeRoutes.get('/:id', UserTypeController.getUserTypeById);
userTypeRoutes.post('/', UserTypeController.createUserType);
userTypeRoutes.put('/:id', UserTypeController.updateUserType);
