import { Schema, model, Document } from 'mongoose';

import * as bcrypt from 'bcryptjs';

interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  state: string;
  city: string;
  admin: boolean;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  admin: {
    type: Boolean,
    required: true,
    trim: true,
  },
});

userSchema.pre<IUser>('save', async function verifyPassword(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  return next();
});

export default model<IUser>('User', userSchema);
