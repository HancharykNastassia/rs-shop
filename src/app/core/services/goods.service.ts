import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/category-models';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  host = "http://localhost:3004/";

  constructor(private http: HttpClient) {}

  getCategoriesList(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${this.host}categories`);
  }
}
