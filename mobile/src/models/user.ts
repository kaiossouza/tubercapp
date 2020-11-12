import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
    id: User['_id'],
    name: string,
    nasc: Date,
    email: string,
    gender: number,
    role: number,
    canSendNews: boolean,
    canNotify: boolean,
    password: string,
    picture: string,
    treatmentStart: Date,
    treatmentDuration: number
};

const UserSchema: Schema = new Schema({
    id: { type: Schema.Types.ObjectId },
    name: { type: String },
    nasc: { type: Date },
    email: { type: String },
    gender: { type: Number },
    role: { type: Number },
    canSendNews: { type: Boolean },
    canNotify: { type: Boolean },
    password: { type: String },
    picture: { type: String },
    treatmentStart: { type: Date },
    treatmentDuration: { type: Number }
});

export default mongoose.model<User>('DatabaseUser', UserSchema);