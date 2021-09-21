import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CategoryModel } from '../models/category-models';
import { ItemModel } from '../models/item-models';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  host = "http://localhost:3004/";

  constructor(private http: HttpClient, private auth: AuthorizationService) {}

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
    if (typeof(startPosition) !=='undefined' && typeof(countNumber) !== 'undefined') {
      const reqParams = new HttpParams().appendAll({
        start: startPosition,
        count: countNumber,
      });
      return this.http.get<ItemModel[]>(path, {params: reqParams});
    }
    return this.http.get<ItemModel[]>(path);
  }

  getItemInfo(id?: string): Observable<ItemModel> {
    if (id) {
      return this.http.get<ItemModel>(`${this.host}goods/item/${id}`);
    }
    return of(<ItemModel>{});
  }

  addItemToChart(id: string): Observable<boolean> {
    return this.auth.checkLocalStroage().pipe(
      switchMap((token) => {
        return this.http.post(`${this.host}users/cart`, {
          "id": id,
        }, {
          headers: new HttpHeaders(`Authorization: Bearer ${token}`),
          observe:'response',
        }).pipe(
          map(res => res.statusText === 'OK')
        )
      })
    );
  }

  addItemToFavorites(id: string): Observable<boolean> {
    return this.auth.checkLocalStroage().pipe(
      switchMap((token) => {
        return this.http.post(`${this.host}users/favorites`, {
          "id": id,
        }, {
          headers: new HttpHeaders(`Authorization: Bearer ${token}`),
          observe:'response',
        }).pipe(
          map(res => res.statusText === 'OK')
        )
      })
    )
  }
}
