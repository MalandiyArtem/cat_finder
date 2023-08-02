import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {apiUrl} from "../../constants/api-url.constants";
import {IBreeds} from "../../Interfaces/breeds.interface";
import {ICatInfo} from "../../Interfaces/cat-info.interface";
import {defaults} from "../../constants/default.constants";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BreedsService {
  private catInfo$ = new BehaviorSubject<ICatInfo[]>([]);

  constructor(private _http: HttpClient) { }

  public getAllBreeds() {
    return this._http.get<IBreeds[]>(apiUrl.getAllBreeds);
  }

  public requestCats(limit: number, ids?: string[]) {
    let params = new HttpParams();

    if (ids) {
      params = params
        .set('limit', limit)
        .set('breed_ids', ids.join(','))
        .set('api_key', defaults.catAPIKey);
    } else {
      params = params
        .set('limit', limit)
        .set('api_key', defaults.catAPIKey);
    }

    this._http.get<ICatInfo[]>(apiUrl.getCats, { params }).subscribe(catInfo => {
      this.catInfo$.next(catInfo);
    });
  }

  public getCats() {
    return this.catInfo$.asObservable();
  }
}
