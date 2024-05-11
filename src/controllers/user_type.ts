import { Context } from 'hono';

import { UserType } from '@/models/user_type';

export class UserTypeController {
  static async getUserTypes(context: Context) {
    const { data, message, status } = await UserType.getUserTypes();
    return context.json({ status, message, data }, status);
  }

  static async getUserTypeById(context: Context) {
    const typeId = context.req.param('id');
    const { data, message, status } = await UserType.getUserTypeById(typeId);
    return context.json({ status, message, data }, status);
  }

  static async createUserType(context: Context) {
    const newUserType = await context.req.json();
    const { data, message, status } = await UserType.createUserType(newUserType);
    return context.json({ status, message, data }, status);
  }

  static async updateUserType(context: Context) {
    const typeId = context.req.param('id');
    const newUserType = await context.req.json();
    const { data, message, status } = await UserType.updateUserType(typeId, newUserType);
    return context.json({ status, message, data }, status);
  }
}
