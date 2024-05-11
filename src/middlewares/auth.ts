import { verify } from 'hono/jwt';
import type { Context, Next } from 'hono';

import { SECRET_KEY_JWT } from '@/config/environment';
import { getJWT } from '@/utils';

export const authMiddleware = async (context: Context, next: Next) => {
  try {
    const bearerToken = context.req.header('Authorization') || '';
    const jwt = getJWT(bearerToken);

    if (!jwt) return context.json({ messagge: 'User not authorization' }, 401);

    await verify(jwt, SECRET_KEY_JWT);
    await next();
  } catch (error) {
    return context.json({ messagge: 'User not authorization' }, 401);
  }
};
