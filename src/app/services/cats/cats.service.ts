import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  constructor(
    private http: HttpClient
  ) { }

  cats$(){
    return this.http.get(`${environment.apiUrl}/cats`, {
      headers : {
        'X-Api-Key': environment.apiKey
      },
      params: {
        name: 'a',
      }
    });
  }

  cat(name:string){
    return this.http.get(`${environment.apiUrl}/cats`, {
      headers : {
        'X-Api-Key': environment.apiKey
      },
      params: {
        name: name,
      }
    });
  }


  search$(keyword:string){
    if(keyword === ''){
      return this.http.get(`${environment.apiUrl}/cats`, {
        headers : {
          'X-Api-Key': environment.apiKey
        },
        params: {
          name: 'a',
        }
      });
    }
    else {
      return this.http.get(`${environment.apiUrl}/cats`, {
        headers : {
          'X-Api-Key': environment.apiKey
        },
        params: {
          name: keyword,
        }
      });
    }


  }
}
