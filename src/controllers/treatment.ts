import { Context } from 'hono';

import { Treatment } from '@/models/treatment';

export class TreatmentController {
  static async getTreatments(context: Context) {
    const { data, message, status } = await Treatment.getTreatments();
    return context.json({ data, message, status }, status);
  }

  static async getTreatmentById(context: Context) {
    const treatmentId = context.req.param('id');
    const { data, message, status } = await Treatment.getTreatmentById(treatmentId);
    return context.json({ data, message, status }, status);
  }

  static async getTreatmentsByUserId(context: Context) {
    const userId = context.req.param('user_id');
    const { data, message, status } = await Treatment.getTreatmentsByUserId(userId);
    return context.json({ data, message, status }, status);
  }

  static async createTreatment(context: Context) {
    const newTreatment = await context.req.json();
    const { data, message, status } = await Treatment.createTreatment(newTreatment);
    return context.json({ data, message, status }, status);
  }

  static async updateTreatment(context: Context) {
    const treatmentId = context.req.param('id');
    const newTreatment = await context.req.json();
    const { data, message, status } = await Treatment.updateTreatment(treatmentId, newTreatment);
    return context.json({ data, message, status }, status);
  }
}
