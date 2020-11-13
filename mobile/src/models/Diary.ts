import Medicine from "../pages/my-diary/medicine";

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

export function checkIfFilled(entry: DiaryEntry) {
    return entry.feedback > 0 || entry.medicine.length > 0 || entry.simptoms.length > 0;
}
