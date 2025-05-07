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

  checkUserName = async () => {
    const { value } = await Preferences.get({ key: 'username' });

    console.log(`Hello ${value}!`);
  };

  async getSetting(key :string): Promise<any> {
    const setting = this.getParam(key);
    if(await setting === '' || setting == null){
      return "Empty";
    }
    else{
      return setting;
    }
  }
}
