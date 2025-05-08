import {Injectable} from '@angular/core';
import {Preferences} from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor() {
  }

  setUserName = async (username: string) => {
    await Preferences.set({
      key: 'username',
      value: username,
    });
  };

  private getParam = async (key :string) => {
    const { value } = await Preferences.get({ key: key });
    return value;
  }


  async getSetting(key: string): Promise<any> {
    const value = await this.getParam(key);
    return value === '' || value == null ? 'Empty' : value;
  }
}
