import DiaryEntry from "./Diary";

export interface User extends Document {
    id: string,
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
    treatmentDuration: number,
    diary: DiaryEntry[],
    emailGodFather: string
};

