import { Hono } from 'hono';

export const indexRoutes = new Hono();

indexRoutes.get('/', (context) =>
  context.json({
    status: 200,
    message: 'Server Online'
  })
);
