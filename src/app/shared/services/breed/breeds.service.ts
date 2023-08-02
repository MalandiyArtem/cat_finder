import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../../constants/api-url.constants";
import {IBreeds} from "../../Interfaces/breeds.interface";

@Injectable({
  providedIn: 'root'
})
export class BreedsService {

  constructor(private _http: HttpClient) { }

  public getAllBreeds() {
    return this._http.get<IBreeds[]>(apiUrl.getAllBreeds);
  }
}
