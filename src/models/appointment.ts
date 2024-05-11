import type { StatusCode } from 'hono/utils/http-status';

import { MongoSetup } from '@/db/mongoSetup';

import { AppointmentModel } from '@/schemas/appointment';

export class Appointment {
  static async getAppointments(): Promise<{
    status: StatusCode;
    message: string;
    data: any[] | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();

      const appointments = await AppointmentModel
        .find({})
        .populate({ path: 'patient', select: '_id name last_name' })
        .populate({ path: 'doctor', select: '_id name last_name' });

      if (appointments.length === 0) {
        return {
          status: 404,
          message: 'Data not found',
          data: null
        };
      }

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Get appointments successfull',
        data: appointments
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

  static async getAppointmentById(appointmentId: string): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();

      const appointment = await AppointmentModel
        .findById(appointmentId)
        .populate({ path: 'patient', select: '_id name last_name' })
        .populate({ path: 'doctor', select: '_id name last_name' });
      
      if (!appointment) {
        return {
          status: 404,
          message: 'Appointment not found',
          data: null
        };
      }

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Get appointment successfull',
        data: appointment
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

  static async getAppointmentsByUserId(userId: string): Promise<{
    status: StatusCode;
    message: string;
    data: any[] | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      
      const appointments = await AppointmentModel
        .find({ patient_id: userId })
        .populate({ path: 'patient', select: '_id name last_name' })
        .populate({ path: 'doctor', select: '_id name last_name' });
      
      if (appointments.length === 0) {
        return {
          status: 404,
          message: 'Data not found',
          data: null
        };
      }
      
      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Get appointments by user_id successfull',
        data: appointments
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

  static async createAppointment(newAppointment: any): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      
      const appointment = new AppointmentModel(newAppointment);
      await appointment.save();
      
      await database.disconnectDatabase();
      
      return {
        status: 200,
        message: 'Create appointment successfull',
        data: appointment
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

  static async updateAppointment(appointmentId: string, newAppointment: any): Promise<{
    status: StatusCode;
    message: string;
    data: object | null;
  }> {
    try {
      const database = await MongoSetup.connectDatabase();
      const currentAppointment = await AppointmentModel.findById(appointmentId);
      
      if (!currentAppointment) {
        return {
          status: 404,
          message: 'Appointment not found',
          data: null
        };
      }
      
      const appointment = await AppointmentModel.findByIdAndUpdate(
        { _id: appointmentId },
        { $set: newAppointment },
        { new: true }
      );

      await database.disconnectDatabase();

      return {
        status: 200,
        message: 'Update appointment successfull',
        data: appointment
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
