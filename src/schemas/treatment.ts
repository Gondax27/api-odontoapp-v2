import { model, Schema } from 'mongoose';

const TreatmentSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  service: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'service'
  },
  status: {
    type: String,
    enum: ['In Progress', 'Finished', 'Cancelled']
  }
});

export const TreatmentModel = model('treatment', TreatmentSchema);
