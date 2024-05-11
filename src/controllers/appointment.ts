import { Context } from 'hono';

import { Appointment } from '@/models/appointment';

export class AppointmentController {
  static async getAppointments(context: Context) {
    const { data, message, status } = await Appointment.getAppointments();
    return context.json({ data, message, status }, status);
  }

  static async getAppointmentById(context: Context) {
    const appointmentId = context.req.param('id');
    const { data, message, status } = await Appointment.getAppointmentById(appointmentId);
    return context.json({ data, message, status }, status);
  }

  static async getAppointmentsByUserId(context: Context) {
    const userId = context.req.param('user_id');
    const { data, message, status } = await Appointment.getAppointmentsByUserId(userId);
    return context.json({ data, message, status }, status);
  }

  static async createAppointment(context: Context) {
    const newAppointment = await context.req.json();
    const { data, message, status } = await Appointment.createAppointment(newAppointment);
    return context.json({ data, message, status }, status);
  }

  static async updateAppointment(context: Context) {
    const appointmentId = context.req.param('id');
    const newAppointment = await context.req.json();
    const { data, message, status } = await Appointment.updateAppointment(appointmentId, newAppointment);
    return context.json({ data, message, status }, status);
  }
}
