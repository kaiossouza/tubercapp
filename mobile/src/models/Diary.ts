export default class DiaryEntry {
    date: Date = new Date();
    feedback: number = 1;
    simptoms: string[] = [];
    medicine: string[] = [];

    constructor(){

    }   
    
    getKey(): string {
        return this.date.toDateString();
    }
};