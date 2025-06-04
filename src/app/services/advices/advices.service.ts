import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdvicesService {

  constructor(
    private http: HttpClient
  ) { }

  advice(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/advice`, {
      headers: {
        'X-Api-Key': environment.apiKey
      },
      params: {

      }
    });
  }
}
