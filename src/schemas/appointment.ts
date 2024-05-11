import { model, Schema } from 'mongoose';

const AppointmentSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Scheduled', 'Finished', 'Cancelled']
  },
  patient: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  doctor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  treatment_id: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'treatment'
  }
});

export const AppointmentModel = model('appointment', AppointmentSchema);
