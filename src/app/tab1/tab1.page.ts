import {Component, signal} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonText,
  IonLabel,
  IonButton, IonProgressBar, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent
} from '@ionic/angular/standalone';
import {ExploreContainerComponent} from '../explore-container/explore-container.component';
import {CatsService} from "../services/cats/cats.service";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {trendingDown} from "ionicons/icons";
import {InfiniteScrollCustomEvent} from "@ionic/angular";
import {SettingsService} from "../services/settings/settings.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardContent, AsyncPipe, NgForOf, IonInput, IonLabel, IonProgressBar, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent],
})
export class Tab1Page {
  private offset = 0;
  username = signal('');
  cats$: Observable<any>;

  constructor(
    private CatsService: CatsService,
    private settingsService: SettingsService,
  ) {
    this.cats$ = this.CatsService.cats$(0)
    this.settingsService.getSetting('username').then((result) => {
      this.username.set(result);
    })
  }

  getBarColor(input: number, inverted: boolean): 'success' | 'warning' | 'danger' {
    const value = input / 5;

    if (inverted) {
      if (value < 0.33) {
        return 'success'; // green
      } else if (value < 0.66) {
        return 'warning'; // yellow
      } else {
        return 'danger'; // red
      }
    } else {
      if (value < 0.33) {
        return 'danger'; // red
      } else if (value < 0.66) {
        return 'warning'; // yellow
      } else {
        return 'success'; // green
      }
    }
  }

  handleSearch(event: CustomEvent) {
    const search = event.detail.value.toLowerCase();
    console.log("Search Input: " + search)
    this.cats$ = this.CatsService.search$(search);
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.offset++;
    this.cats$ = this.CatsService.cats$(this.offset)
    console.log("Offset: " + this.offset)
  }
}
