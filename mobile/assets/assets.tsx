export default class tubercAssets {
    baseUrl: string;
    doctor: string;
    dots: string;
    favicon: string;
    goback: string;
    icon: string;
    logo: string;
    logoText: string;
    medicineImage: string;
    medicine: string;
    setBottom: string;
    setting: string;
    splash: string;
    symptonsImage: string;
    symptoms: string;
    thinkingImage: string;
    thinking: string;
    tuberculose: string;
    yuri: string;
    pills: string;

    constructor(newUrl: string) {
        this.baseUrl = newUrl;
        this.doctor = this.baseUrl + 'doctor.png';
        this.doctor = this.baseUrl + 'doctor.png';
        this.dots = this.baseUrl + 'dots.png';
        this.favicon = this.baseUrl + 'favicon.png';
        this.goback = this.baseUrl + 'goback.png';
        this.icon = this.baseUrl + 'icon.png';
        this.logo = this.baseUrl + 'logo.png';
        this.logoText = this.baseUrl + 'logoText.png';
        this.medicineImage = this.baseUrl + 'medicine-image.png';
        this.medicine = this.baseUrl + 'medicine.png';
        this.setBottom = this.baseUrl + 'setBottom.png';
        this.setting = this.baseUrl + 'setting.png';
        this.splash = this.baseUrl + 'splash.png';
        this.symptonsImage = this.baseUrl + 'symptons-image.png';
        this.symptoms = this.baseUrl + 'symptoms.png';
        this.thinkingImage = this.baseUrl + 'thinking-image.png';
        this.thinking = this.baseUrl + 'thinking.png';
        this.tuberculose = this.baseUrl + 'tuberculose.png';
        this.yuri = this.baseUrl + 'yuri.png';
        this.pills = this.baseUrl + 'pills.png';
    }
}