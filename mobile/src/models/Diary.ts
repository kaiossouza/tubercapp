export default class DiaryEntry {
    date: Date = new Date();
    feedback: number = 1;
    simptoms: string[] = [];
    medicine: string[] = [];
    availableMedicine: string[] = [];  
};

export class DiarySummary {
    feedback:  string = "";
    symptoms: string = "";
    medicine: string = ""; 
};
