import { Context } from 'hono';

import { User } from '@/models/user';

export class UserController {
  static async getUsers(context: Context) {
    const { data, message, status } = await User.getUsers();
    return context.json({ status, message, data }, status);
  }

  static async getUserById(context: Context) {
    const userId = context.req.param('id');
    const { data, message, status } = await User.getUserById(userId);
    return context.json({ status, message, data }, status);
  }

  static async getUsersByType(context: Context) {
    const typeId = context.req.param('type_id');
    const { data, message, status } = await User.getUsersByType(typeId);
    return context.json({ status, message, data }, status);
  }

  static async createUser(context: Context) {
    const newUser = await context.req.json();
    const { data, message, status } = await User.createUser(newUser);
    return context.json({ status, message, data }, status);
  }

  static async updateUser(context: Context) {
    const userId = context.req.param('id');
    const newUser = await context.req.json();
    const { data, message, status } = await User.updateUser(userId, newUser);
    return context.json({ status, message, data }, status);
  }

  static async deleteUser(context: Context) {
    const userId = context.req.param('id');
    const { data, message, status } = await User.deleteUser(userId);
    return context.json({ status, message, data }, status);
  }
}
