import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  constructor(
    private http: HttpClient
  ) {
  }

  cats$(offset: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/cats`, {
      headers: {
        'X-Api-Key': environment.apiKey
      },
      params: {
        name: 'a',
        offset: offset.toString(), // make sure it’s a string
      }
    });
  }

  cat(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/cats`, {
      headers: {
        'X-Api-Key': environment.apiKey
      },
      params: {
        name: name,
      }
    });
  }


  search$(keyword: string) {
    if (keyword === '') {
      return this.http.get(`${environment.apiUrl}/cats`, {
        headers: {
          'X-Api-Key': environment.apiKey
        },
        params: {
          name: 'a',
        }
      });
    } else {
      return this.http.get(`${environment.apiUrl}/cats`, {
        headers: {
          'X-Api-Key': environment.apiKey
        },
        params: {
          name: keyword,
        }
      });
    }


  }
}
