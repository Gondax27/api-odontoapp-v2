import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  name: {
    required: true,
    type: String,
    trim: true
  },
  last_name: {
    required: true,
    type: String,
    trim: true
  },
  phone: {
    required: true,
    type: String,
    trim: true
  },
  email: {
    required: true,
    type: String,
    trim: true
  },
  password: {
    required: true,
    type: String,
    trim: true
  },
  type: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'user-type'
  }
});

export const UserModel = model('user', UserSchema);
