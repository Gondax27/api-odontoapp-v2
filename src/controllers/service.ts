import { Context } from 'hono';

import { Service } from '@/models/service';

export class ServiceController {
  static async getServices(context: Context) {
    const { data, message, status } = await Service.getServices();
    return context.json({ data, message, status }, status);
  }

  static async getServiceById(context: Context) {
    const serviceId = context.req.param('id');
    const { data, message, status } = await Service.getServiceById(serviceId);
    return context.json({ data, message, status }, status);
  }

  static async createService(context: Context) {
    const newService = await context.req.json();
    const { data, message, status } = await Service.createService(newService);
    return context.json({ data, message, status }, status);
  }

  static async updateService(context: Context) {
    const serviceId = context.req.param('id');
    const newService = await context.req.json();
    const { data, message, status } = await Service.updateService(serviceId, newService);
    return context.json({ data, message, status }, status);
  }

  static async deleteService(context: Context) {
    const serviceId = context.req.param('id');
    const { data, message, status } = await Service.deleteService(serviceId);
    return context.json({ data, message, status }, status);
  }
}
