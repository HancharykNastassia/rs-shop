import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryModel } from '../models/category-models';
import { ItemModel } from '../models/item-models';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  host = "http://localhost:3004/";
  //itemsGroup = new BehaviorSubject<ItemModel[]>([]);

  constructor(private http: HttpClient) {}

  getCategoriesList(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${this.host}categories`);
  }

  getGoodsFrom(
  category: string,
  subcategory?: string,
  startPosition?: number,
  countNumber?: number): Observable<ItemModel[]> {
    let path = `${this.host}goods/category/${category}`;
    if (subcategory) {
      path = `${path}/${subcategory}`;
    }
    if (startPosition && countNumber) {
      const params = new HttpParams().appendAll({
        start: startPosition,
        count: countNumber,
      });
      return this.http.get<ItemModel[]>(path, {params});
    }
    return this.http.get<ItemModel[]>(path);
  }
}
