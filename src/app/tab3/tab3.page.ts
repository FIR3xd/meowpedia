import {Component, signal} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {SettingsService} from "../services/settings/settings.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput],
})
export class Tab3Page {
  username = signal('loading...');
  constructor(
    private settingsService: SettingsService,
  ) {
    this.settingsService.getSetting('username').then((result) => {
      this.username.set(result);
    })
  }

  saveUserName(event: CustomEvent) {
    const username = event.detail.value
    this.settingsService.setUserName(username);
  }


}
