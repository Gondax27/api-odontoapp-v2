import { serve } from '@hono/node-server';

import { Server } from './config/server';
import { PORT } from './config/environment';

const server = new Server();

serve({
  fetch: server.getServer().fetch,
  port: PORT
});
