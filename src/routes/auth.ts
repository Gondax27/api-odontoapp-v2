import { Hono } from 'hono';

import { AuthController } from '@/controllers/auth';
import { authMiddleware } from '@/middlewares/auth';

export const authRoutes = new Hono();

authRoutes.post('/login', AuthController.loginUser);
authRoutes.get('/verify', authMiddleware, AuthController.verifyToken);
