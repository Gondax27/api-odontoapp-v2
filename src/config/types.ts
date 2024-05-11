import { Hono } from 'hono';

export interface IServer {
  getServer(): Hono;
}
