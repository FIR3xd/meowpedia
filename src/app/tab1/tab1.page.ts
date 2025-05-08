import {Component, signal} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonLabel,
  IonProgressBar,
  IonSearchbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRefresher,
  IonRefresherContent
} from '@ionic/angular/standalone';
import {CatsService} from "../services/cats/cats.service";
import {BehaviorSubject, Observable} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";
import {InfiniteScrollCustomEvent, RefresherCustomEvent} from "@ionic/angular";
import {SettingsService} from "../services/settings/settings.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardContent, AsyncPipe, NgForOf, IonInput, IonLabel, IonProgressBar, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonRefresher, IonRefresherContent],
})
export class Tab1Page {
  private offset = 0;
  pageSize: number = 20;
  username = signal('');
  private allCats: any[] = [];
  private catsSubject = new BehaviorSubject<any[]>([]);
  cats$: Observable<any> = this.catsSubject.asObservable();

  constructor(
    private CatsService: CatsService,
    private settingsService: SettingsService,
  ) {
    this.CatsService.cats$(this.offset).subscribe((initialCats) => {
      this.allCats = initialCats;
      this.catsSubject.next(this.allCats);
    });


    this.settingsService.getSetting('username').then((result) => {
      if (result == null || result == 'Empty') {
        this.username.set('User');
      }
      else {
        this.username.set(result);
      }
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
    this.CatsService.cats$(this.offset).subscribe((newCats: any[]) => {
      if (!newCats || newCats.length === 0) {
        event.target.disabled = true;
      } else {
        this.allCats = [...this.allCats, ...newCats];
        this.offset += this.pageSize; // increment offset for next request
      }
      event.target.complete();
    });
  }

  handleRefresh(event: RefresherCustomEvent) {
    window.location.reload();
    event.target.complete();
  }
}
