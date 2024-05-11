import bcrypt from 'bcrypt';
import { sign, decode } from 'hono/jwt';
import type { StatusCode } from 'hono/utils/http-status';

import { MongoSetup } from '@/db/mongoSetup';
import { SECRET_KEY_JWT } from '@/config/environment';

import { UserModel } from '@/schemas/user';

export class Auth {
  static async loginUser(loginData: { email: string; password: string }): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();

      const user = await UserModel.findOne({ email: loginData.email || '' }).populate({
        path: 'type',
        select: '_id name'
      });

      if (!user) return { status: 400, message: 'Invalid user or password', data: null };

      const isValidPassword = bcrypt.compareSync(loginData.password, user.password);
      if (!isValidPassword) return { status: 400, message: 'Invalid user or password', data: null };

      const payload = {
        sub: user._id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60
      };

      const token = await sign(payload, SECRET_KEY_JWT);
      if (!token) return { status: 500, message: 'Internal server error', data: null };

      const { email, type, name, last_name, phone, _id } = user;
      const newUser = { email, type, name, last_name, phone, _id };

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'User login successfull',
        data: { user: newUser, token }
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: 'Internal server error',
        data: null
      };
    }
  }

  static async verifyToken(token: string): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();

      const { payload } = decode(token);
      if (!payload) return { status: 404, message: 'Payload not found', data: null };

      const user = await UserModel.findById(payload?.sub || '')
        .select('-__v -password')
        .populate({ path: 'type', select: '_id name' });

      if (!user) return { status: 500, message: 'User not found', data: null };

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Verification token successfull',
        data: user
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: 'Internal server error',
        data: null
      };
    }
  }
}
