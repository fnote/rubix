import { Injectable } from '@angular/core';

@Injectable()
export class LocalizationService {
    languageCode;
    layout;
    supportedLanguages: {
        EN: {des: 'English' , layout: 'ltr'},
        AR: {des: 'Arabic' , layout: 'rtl'}
    };
    constructor() {}

    setActiveLanguage(lanCode: string): void {
        const activeLanguage = this.supportedLanguages[lanCode];
        if (activeLanguage) {
            this.languageCode = lanCode;
            this.layout = activeLanguage.layout;
        }
    }

    changeActiveLanguage(lanCode: string): void {
       this.setActiveLanguage(lanCode);
    }

}
