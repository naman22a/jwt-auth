import { Schema, model } from "mongoose";
import IUser from '../interfaces/IUser';

const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
	email: {
		type: String,
		required: true,
		min: 6,
		max: 255,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	}
}, { timestamps: true }
);

const User = model<IUser>('User', userSchema);

export default User;