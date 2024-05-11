import { Hono } from 'hono';

import { AppointmentController } from '@/controllers/appointment';

export const appointmentRoutes = new Hono();

appointmentRoutes.get('/', AppointmentController.getAppointments);
appointmentRoutes.get('/:id', AppointmentController.getAppointmentById);
appointmentRoutes.get('/user/:user_id', AppointmentController.getAppointmentsByUserId);
appointmentRoutes.post('/', AppointmentController.createAppointment);
appointmentRoutes.put('/:id', AppointmentController.updateAppointment);
