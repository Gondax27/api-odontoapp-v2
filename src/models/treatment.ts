import type { StatusCode } from 'hono/utils/http-status';

import { MongoSetup } from '@/db/mongoSetup';

import { TreatmentModel } from '@/schemas/treatment';

export class Treatment {
  static async getTreatments(): Promise<{
    status: StatusCode;
    message: string;
    data: any[] | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();

      const treatments = await TreatmentModel.find({})
        .populate({ path: 'patient', select: '_id name last_name' })
        .populate({ path: 'service', select: '_id name last_name' });

      if (treatments.length === 0) {
        return {
          status: 404,
          message: 'Data not found',
          data: null
        };
      }

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Get treatments successfull',
        data: treatments
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

  static async getTreatmentById(treatmentId: string): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();

      const treatment = await TreatmentModel.findById(treatmentId)
        .populate({ path: 'patient', select: '_id name last_name' })
        .populate({ path: 'service', select: '_id name last_name' });

      if (!treatment) {
        return {
          status: 404,
          message: 'Data not found',
          data: null
        };
      }

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Get treatment successfull',
        data: treatment
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

  static async getTreatmentsByUserId(userId: string): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      
      const treatments = await TreatmentModel.find({ patient: userId })
      .populate({ path: 'patient', select: '_id name last_name' })
      .populate({ path: 'service', select: '_id name last_name' });
      
      if (treatments.length === 0) {
        return {
          status: 404,
          message: 'Data not found',
          data: null
        };
      }

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Get treatments by user_id successfull',
        data: treatments
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

  static async createTreatment(newTreatment: any): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      
      const treatment = new TreatmentModel(newTreatment);
      await treatment.save();

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Create treatment successfull',
        data: treatment
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

  static async updateTreatment(treatmentId: string, newTreatment: any): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      const currentTreatment = await TreatmentModel.findById(treatmentId);
      
      if (!currentTreatment) {
        return {
          status: 404,
          message: 'Treatment not found',
          data: null
        };
      }
      
      const treatment = await TreatmentModel.findByIdAndUpdate(
        { _id: treatmentId },
        { $set: newTreatment },
        { new: true }
      );

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Create treatment successfull',
        data: treatment
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
