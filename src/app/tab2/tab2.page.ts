import {Component, signal} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonLabel, IonList, IonProgressBar, IonText
} from '@ionic/angular/standalone';
import {forkJoin, map, Observable, of, switchMap, tap} from "rxjs";
import {FavoritesService} from "../services/favorites/favorites.service";
import {CatsService} from "../services/cats/cats.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, AsyncPipe, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonLabel, IonList, IonProgressBar, NgForOf, IonText, NgIf]
})
export class Tab2Page {
  favCats$ = this.favoritesService.favCats$;

  favCatObjects$ = this.favCats$.pipe(
    tap(catIds => console.log('[favCats$ emitted]:', catIds)),
    switchMap(catIds => {
      if (!catIds.length) {
        console.warn('No favorite cat IDs found.');
        return of([]);
      }

      const requests = catIds.map(id => {
        console.log(`Fetching cat for id: ${id}`);
        return this.CatsService.cat(id).pipe(
          tap(result => console.log(`[API Response for ${id}]:`, result))
        );
      });

      return forkJoin(requests).pipe(
        map(results => {
          console.log('[Raw forkJoin results]:', results);
          return results.map(res => res[0]); // Assuming API returns an array
        })
      );
    })
  );

  constructor(
    private favoritesService: FavoritesService,
    private CatsService: CatsService,
  ) {
    this.favoritesService.loadFavorites();
    this.favCatObjects$.subscribe(cats => {
      console.log('Favorite cat objects:', cats);
    });
  }

  async removeFromFavorites(catId: string) {
    await this.favoritesService.removeCatFromFavorites(catId);
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


}
