import {Injectable} from '@angular/core';
import {Preferences} from '@capacitor/preferences';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favCatsSubject = new BehaviorSubject<string[]>([]);
  favCats$ = this.favCatsSubject.asObservable(); // <- use this in your component!

  private FAVORITES_KEY = 'favoriteCats';

  async loadFavorites() {
    const {value} = await Preferences.get({key: this.FAVORITES_KEY});
    const favs = value ? JSON.parse(value) : [];
    this.favCatsSubject.next(favs);
  }

  async addCatToFavorites(catId: string) {
    const current = await this.getFavoriteCats();
    if (!current.includes(catId)) {
      current.push(catId);
      await Preferences.set({key: this.FAVORITES_KEY, value: JSON.stringify(current)});
      this.favCatsSubject.next(current);
    }
  }

  async removeCatFromFavorites(catId: string) {
    let current = await this.getFavoriteCats();
    current = current.filter(id => id !== catId);
    await Preferences.set({key: this.FAVORITES_KEY, value: JSON.stringify(current)});
    this.favCatsSubject.next(current);
  }

  async getFavoriteCats(): Promise<string[]> {
    const {value} = await Preferences.get({key: this.FAVORITES_KEY});
    return value ? JSON.parse(value) : [];
  }

  async isCatFavorite(catId: string): Promise<boolean> {
    const current = await this.getFavoriteCats();
    return current.includes(catId);
  }
}
