import { Auth } from '@/models/auth';
import { getJWT } from '@/utils';
import { Context } from 'hono';

export class AuthController {
  static async loginUser(context: Context) {
    const loginData = await context.req.json();
    const { data, message, status } = await Auth.loginUser(loginData);
    return context.json({ data, message, status }, status);
  }

  static async verifyToken(context: Context) {
    const bearerToken = context.req.header('Authorization') || '';
    const token = getJWT(bearerToken);
    const { data, message, status } = await Auth.verifyToken(token);
    return context.json({ data, message, status }, status);
  }
}
