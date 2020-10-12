export interface User {
    name: String,
    nasc: Date,
    email: String,
    gender: Number,
    role: Number,
    canSendNews: Boolean,
    canNotify: Boolean,
    password: String,
    picture: any,
    treatmentStart: Date,
    treatmentDuration: Number
}