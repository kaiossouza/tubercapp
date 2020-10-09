export interface User {
    name: String,
    nasc: Date,
    email: String,
    gender: Number,
    role: Number,
    canSendNews: Boolean,
    canNotify: Boolean,
    password: String,
    picture: String,
    treatmentStart: Date,
    treatmentDuration: Number
}