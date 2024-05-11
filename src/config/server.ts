import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { appointmentRoutes } from '@/routes/appointments';
import { authRoutes } from '@/routes/auth';
import { indexRoutes } from '@/routes';
import { serviceRoutes } from '@/routes/services';
import { treatmentRoutes } from '@/routes/treatments';
import { userRoutes } from '@/routes/users';
import { userTypeRoutes } from '@/routes/user_types';

import { authMiddleware } from '@/middlewares/auth';

import { IServer } from './types';

export class Server implements IServer {
  private server: Hono;

  constructor() {
    this.server = new Hono();
    this.startServer();
  }

  private startMiddlewares() {
    this.server.use(cors());
    this.server.use('/api/v1/*', authMiddleware)
  }

  private startRoutes() {
    this.server.route('/', indexRoutes);
    this.server.route('/auth/v1', authRoutes);
    this.server.route('/api/v1/users', userRoutes);
    this.server.route('/api/v1/treatments', treatmentRoutes);
    this.server.route('/api/v1/user-types', userTypeRoutes);
    this.server.route('/api/v1/appointments', appointmentRoutes);
    this.server.route('/api/v1/services', serviceRoutes);
  }

  private startServer() {
    this.startMiddlewares();
    this.startRoutes();
    console.log('Server online');
  }

  getServer() {
    return this.server;
  }
}
