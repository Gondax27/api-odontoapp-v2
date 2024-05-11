import { Hono } from 'hono';

import { TreatmentController } from '@/controllers/treatment';

export const treatmentRoutes = new Hono();

treatmentRoutes.get('/', TreatmentController.getTreatments);
treatmentRoutes.get('/:id', TreatmentController.getTreatmentById);
treatmentRoutes.get('/user/:user_id', TreatmentController.getTreatmentsByUserId);
treatmentRoutes.post('/', TreatmentController.createTreatment);
treatmentRoutes.put('/:id', TreatmentController.updateTreatment);
