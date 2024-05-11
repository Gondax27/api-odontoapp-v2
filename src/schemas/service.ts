import { model, Schema } from 'mongoose';

const ServiceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  appointments: {
    type: Number,
    required: true
  }
});

export const ServiceModel = model('service', ServiceSchema);
