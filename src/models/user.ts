import bcrypt from 'bcrypt';
import type { StatusCode } from 'hono/utils/http-status';

import { MongoSetup } from '@/db/mongoSetup';

import { UserModel } from '@/schemas/user';

export class User {
  static async getUsers(): Promise<{
    status: StatusCode;
    message: string;
    data: any[] | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      
      const users = await UserModel
        .find({})
        .select('-__v -password')
        .populate({ path: 'type', select: '-description -__v' });

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Get users successfull',
        data: users
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

  static async getUserById(userId: string): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      
      const user = await UserModel
        .findById(userId)
        .select('-__v -password')
        .populate({ path: 'type', select: '-description -__v' });
      
      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Get user by id successfull',
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

  static async getUsersByType(typeId: string): Promise<{
    status: StatusCode;
    message: string;
    data: any[] | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      
      const users = await UserModel
        .find({ type: typeId })
        .select('-__v -password')
        .populate({ path: 'type', select: '-description -__v' });
      
      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Get users by type_id successfull',
        data: users
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

  static async createUser(newUser: any): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      const currentUser = await UserModel.findOne({ email: newUser?.email || '' });
      
      if (currentUser) {
        return {
          status: 400,
          message: 'The user is already registered',
          data: null
        };
      }
      
      const user = new UserModel(newUser);
      const salt = bcrypt.genSaltSync(15);
      user.password = bcrypt.hashSync(user.password, salt);
      await user.save();
      
      await database.disconnectDatabase();

      return {
        status: 201,
        message: 'Create user successfull',
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

  static async updateUser(userId: string, newUser: any): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      const currentUser = await UserModel.findById(userId);
      
      if (!currentUser) {
        return {
          status: 404,
          message: 'User not found',
          data: null
        };
      }
      
      const user = await UserModel
        .findByIdAndUpdate({ _id: userId }, { $set: newUser }, { new: true })
        .populate('type');

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Update user successfull',
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

  static async deleteUser(userId: string): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      const currentUser = await UserModel.findById(userId);        
      
      if (!currentUser) {
        return {
          status: 404,
          message: 'User not found',
          data: null
        };
      }
      
      await UserModel.findByIdAndDelete({_id: userId});
      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Update user successfull',
        data: {
          user_id: userId,
          user_deleted: true
        }
      }
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
