import {Injectable} from '@angular/core';
import {Preferences} from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor() {
  }

  setParam = async (key: string, param: string) => {
    await Preferences.set({
      key: key,
      value: param,
    });
  }

  private getParam = async (key: string) => {
    const {value} = await Preferences.get({key: key});
    return value;
  }

  async getSetting(key: string): Promise<any> {
    const value = await this.getParam(key);
    return value === '' || value == null ? 'Empty' : value;
  }

  async clearAll(): Promise<void> {
    await Preferences.remove({key: 'username'});
  }
}
