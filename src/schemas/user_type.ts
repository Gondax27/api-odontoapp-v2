import { Schema, model } from 'mongoose';

const UserTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
});

export const UserTypeModel = model('user-type', UserTypeSchema);
