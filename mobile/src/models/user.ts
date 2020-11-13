import DiaryEntry from "./Diary";

export class User {
    id: string = "";
    name: string = "";
    nasc: Date = new Date();
    email: string = "";
    gender: number = 0;
    role: number = 0;
    canSendNews: boolean = false;
    canNotify: boolean = false;
    password: string = "";
    picture: string = "";
    treatmentStart: Date = new Date();
    treatmentDuration: number = 0;
    diary: DiaryEntry[] = [];
    emailGodFather: string = "";
};

