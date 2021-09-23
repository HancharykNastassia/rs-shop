import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CategoryModel } from '../models/category-models';
import { ItemModel } from '../models/item-models';
import { Order, OrderDetails } from '../models/user';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root',
})
export class GoodsService {
  constructor(private http: HttpClient, private auth: AuthorizationService) {}

  searchItem(q: string): Observable<ItemModel[]> {
    return q
      ? this.http.get<ItemModel[]>(`goods/search`, {
          params: new HttpParams().set('text', q),
        })
      : of(<ItemModel[]>[]);
  }

  getCategoriesList(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`categories`);
  }

  getGoodsFrom(
    category: string,
    subcategory?: string,
    startPosition?: number,
    countNumber?: number,
    sortBy?: string,
    reverse?: boolean
  ): Observable<ItemModel[]> {
    let path = `goods/category/${category}`;
    if (subcategory) {
      path = `${path}/${subcategory}`;
    }
    let params: HttpParams | undefined;
    if (typeof startPosition === 'number') {
      params = new HttpParams().set('start', startPosition);
    }
    if (typeof countNumber === 'number') {
      params = (params || new HttpParams()).set('count', countNumber);
    }
    if (sortBy) {
      params = (params || new HttpParams()).set('sortBy', sortBy);
    }
    if (typeof reverse === 'boolean') {
      params = (params || new HttpParams()).set('reverse', reverse);
    }
    return this.http.get<ItemModel[]>(path, { params });
  }

  getItemInfo(id?: string): Observable<ItemModel> {
    if (id) {
      return this.http.get<ItemModel>(`goods/item/${id}`);
    }
    return of(<ItemModel>{});
  }

  addItemToChart(id: string): Observable<boolean> {
    return this.auth.checkLocalStroage().pipe(
      switchMap((token) => {
        return this.http
          .post(
            `users/cart`,
            {
              id: id,
            },
            {
              headers: new HttpHeaders(`Authorization: Bearer ${token}`),
              observe: 'response',
            }
          )
          .pipe(map((res) => res.ok));
      })
    );
  }

  removeItemFromChart(id: string): Observable<boolean> {
    return this.auth.checkLocalStroage().pipe(
      switchMap((token) => {
        return this.http
          .delete(`users/cart`, {
            headers: new HttpHeaders(`Authorization: Bearer ${token}`),
            params: new HttpParams().set('id', id),
            observe: 'response',
          })
          .pipe(map((res) => res.ok));
      })
    );
  }

  makeOrder(order: Order): Observable<boolean> {
    return this.auth.checkLocalStroage().pipe(
      switchMap((token) => {
        return this.http
          .post(`users/order`, order, {
            headers: new HttpHeaders(`Authorization: Bearer ${token}`),
            observe: 'response',
          })
          .pipe(map((res) => res.ok));
      })
    );
  }

  cancelOrder(id: string): Observable<boolean> {
    return this.auth.checkLocalStroage().pipe(
      switchMap((token) => {
        return this.http
          .delete(`users/order`, {
            headers: new HttpHeaders(`Authorization: Bearer ${token}`),
            params: new HttpParams().set('id', id),
            observe: 'response',
          })
          .pipe(map((res) => res.ok));
      })
    );
  }

  changeOrderDetais(id: string, details: OrderDetails): Observable<boolean> {
    return this.auth.checkLocalStroage().pipe(
      switchMap((token) => {
        return this.http
          .put(
            `users/order`,
            {
              id: id,
              details: details,
            },
            {
              headers: new HttpHeaders(`Authorization: Bearer ${token}`),
              observe: 'response',
            }
          )
          .pipe(map((res) => res.ok));
      })
    );
  }

  addItemToFavorites(id: string): Observable<boolean> {
    return this.auth.checkLocalStroage().pipe(
      switchMap((token) => {
        return this.http
          .post(
            `users/favorites`,
            {
              id: id,
            },
            {
              headers: new HttpHeaders(`Authorization: Bearer ${token}`),
              observe: 'response',
            }
          )
          .pipe(map((res) => res.ok));
      })
    );
  }

  removeItemFromFavorites(id: string): Observable<boolean> {
    return this.auth.checkLocalStroage().pipe(
      switchMap((token) => {
        return this.http
          .delete(`users/favorites`, {
            headers: new HttpHeaders(`Authorization: Bearer ${token}`),
            params: new HttpParams().set('id', id),
            observe: 'response',
          })
          .pipe(map((res) => res.ok));
      })
    );
  }
}
