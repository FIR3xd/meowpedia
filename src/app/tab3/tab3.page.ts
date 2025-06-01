import {Component, signal} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButton, IonAlert
} from '@ionic/angular/standalone';
import {SettingsService} from "../services/settings/settings.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonButton, IonAlert],
})
export class Tab3Page {
  username = signal('loading...');

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Clear canceled');
      },
    },
    {
      text: 'Clear',
      role: 'confirm',
      handler: () => {
        console.log('Clear Settings');
        this.settingsService.clearAll();
        this.handleUsernameChange();
        window.location.reload();
      },
    },
  ];

  constructor(
    private settingsService: SettingsService,
  ) {
    this.handleUsernameChange();
  }

  handleUsernameChange(): void {
    this.settingsService.getSetting('username').then((result) => {
      this.username.set(result);
    })
  }

  saveUserName(event: CustomEvent) {
    const username = event.detail.value
    this.settingsService.setParam('username', username)
    window.location.reload();
  }



}
