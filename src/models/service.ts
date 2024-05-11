import type { StatusCode } from 'hono/utils/http-status';

import { MongoSetup } from '@/db/mongoSetup';

import { ServiceModel } from '@/schemas/service';

export class Service {
  static async getServices(): Promise<{
    status: StatusCode;
    message: string;
    data: any[] | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      const services = await ServiceModel.find({});
      
      if (services.length === 0) {
        return {
          status: 404,
          message: 'Data not found',
          data: null
        };
      }

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Get services successfull',
        data: services
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

  static async getServiceById(serviceId: string): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      const service = await ServiceModel.findById(serviceId);
      
      if (!service) {
        return {
          status: 404,
          message: 'Service not found',
          data: null
        };
      }

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Get service by id successfull',
        data: service
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

  static async createService(newService: any): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();

      const service = new ServiceModel(newService);
      await service.save();

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Create service successfull',
        data: service
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

  static async updateService(serviceId: string, newService: any): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      const currentService = await ServiceModel.findById(serviceId);
      
      if (!currentService) {
        return {
          status: 404,
          message: 'Service not found',
          data: null
        }
      }
      
      const service = await ServiceModel.findByIdAndUpdate({ _id: serviceId }, { $set: newService }, { new: true });
      
      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Update service successfull',
        data: service
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

  static async deleteService(serviceId: string): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      const currentService = await ServiceModel.findById(serviceId);
      
      if (!currentService) {
        return {
          status: 404,
          message: 'Service not found',
          data: null
        }
      }
      
      await ServiceModel.findByIdAndDelete({ _id: serviceId });
      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Delete service successfull',
        data: {
          service_id: serviceId,
          service_deleted: true
        }
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
