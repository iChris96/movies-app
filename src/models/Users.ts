import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/users';

const UserSchema = new Schema<IUser>({
    id: Number,
    email: String,
    password: String,
});

export const Users = model<IUser>('Users', UserSchema);
