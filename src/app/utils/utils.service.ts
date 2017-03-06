import { Injectable } from '@angular/core';
import { StorageService } from './localStorage/storage.service';
import { LocalizationService } from './localization/localization.service';

@Injectable()
export class UtilsService {

  storageManager: StorageService;

  localizationManager: LocalizationService;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    this.storageManager = new StorageService();
    this.localizationManager = new LocalizationService();
  }

  formatText(input: string): string {
    return 'formatted text';
  }

  getStorageManager(): StorageService {
    return this.storageManager;
  }

  getHelperManager(): any {
    return null;
  }

  geTradeHelperManager(): any {
    return null;
  }

   geLocalizationManager(): LocalizationService {
    return this.localizationManager;
  }
}
