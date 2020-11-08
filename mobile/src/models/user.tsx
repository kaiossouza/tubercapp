export interface User {
    name: string,
    nasc: Date,
    email: string,
    gender: number,
    role: number,
    canSendNews: boolean,
    canNotify: boolean,
    password: string,
    picture: any,
    treatmentStart: Date,
    treatmentDuration: number
}