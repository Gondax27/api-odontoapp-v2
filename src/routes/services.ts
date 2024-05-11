import { ServiceController } from '@/controllers/service';
import { Hono } from 'hono';

export const serviceRoutes = new Hono();

serviceRoutes.get('/', ServiceController.getServices);
serviceRoutes.get('/:id', ServiceController.getServiceById);
serviceRoutes.post('/', ServiceController.createService);
serviceRoutes.put('/:id', ServiceController.updateService);
serviceRoutes.delete('/:id', ServiceController.deleteService);
