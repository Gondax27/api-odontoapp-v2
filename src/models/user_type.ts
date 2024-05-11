import type { StatusCode } from 'hono/utils/http-status';

import { MongoSetup } from '@/db/mongoSetup';

import { UserTypeModel } from '@/schemas/user_type';

export class UserType {
  static async getUserTypes(): Promise<{
    status: StatusCode;
    message: string;
    data: any[] | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      const userTypes = await UserTypeModel.find({});

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Get user types successfull',
        data: userTypes
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

  static async getUserTypeById(typeId: string): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      const userType = await UserTypeModel.findById(typeId);

      if (!userType) {
        return {
          status: 404,
          message: 'Data not found',
          data: null
        };
      }

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Get user type by id successfull',
        data: userType
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

  static async createUserType(newUserType: any): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();

      const userType = new UserTypeModel(newUserType);
      await userType.save();

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Create user type successfull',
        data: userType
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

  static async updateUserType(typeId: string, newUserType: any): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      const currentUserType = await UserTypeModel.findById(typeId);

      if (!currentUserType) {
        return {
          status: 404,
          message: 'User type not found',
          data: null
        };
      }

      const userType = await UserTypeModel.findByIdAndUpdate(
        { _id: typeId },
        { $set: newUserType },
        { new: true }
      );

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Update user type successfull',
        data: userType
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
