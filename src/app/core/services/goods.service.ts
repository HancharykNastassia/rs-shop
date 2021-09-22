import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CategoryModel } from '../models/category-models';
import { ItemModel } from '../models/item-models';
import { Order, OrderDetails } from '../models/user';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  host = "http://localhost:3004/";

  constructor(private http: HttpClient, private auth: AuthorizationService) {}

  searchItem(q: string): Observable<ItemModel[]> {
    return q ? this.http.get<ItemModel[]>(`${this.host}goods/search`,{
      params: new HttpParams().set("text", q),
    }) : of(<ItemModel[]>[]);
  }

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
          map(res => res.ok)
        )
      })
    );
  }

  removeItemFromChart(id: string): Observable<boolean> {
    return this.auth.checkLocalStroage().pipe(
      switchMap((token) => {
        return this.http.delete(`${this.host}users/cart`, {
          headers: new HttpHeaders(`Authorization: Bearer ${token}`),
          params: new HttpParams().set("id", id),
          observe:'response',
        }).pipe(
          map(res => res.ok)
        )
      })
    );
  }

  makeOrder(order: Order): Observable<boolean> {
    return this.auth.checkLocalStroage().pipe(
      switchMap((token) => {
        return this.http.post(`${this.host}users/order`, order,{
          headers: new HttpHeaders(`Authorization: Bearer ${token}`),
          observe:'response',
        }).pipe(
          map(res => res.ok)
        )
      })
    );
  }

  cancelOrder(id: string): Observable<boolean> {
    return this.auth.checkLocalStroage().pipe(
      switchMap((token) => {
        return this.http.delete(`${this.host}users/order`,{
          headers: new HttpHeaders(`Authorization: Bearer ${token}`),
          params: new HttpParams().set("id", id),
          observe:'response',
        }).pipe(
          map(res => res.ok)
        )
      })
    );
  }

  changeOrderDetais(id: string, details: OrderDetails): Observable<boolean>{
    return this.auth.checkLocalStroage().pipe(
      switchMap((token) => {
        return this.http.put(`${this.host}users/order`,{
          "id": id,
          "details": details,
        },{
          headers: new HttpHeaders(`Authorization: Bearer ${token}`),
          observe:'response',
        }).pipe(
          map(res => res.ok)
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
          map(res => res.ok)
        )
      })
    )
  }

  removeItemFromFavorites(id: string): Observable<boolean> {
    return this.auth.checkLocalStroage().pipe(
      switchMap((token) => {
        return this.http.delete(`${this.host}users/favorites`, {
          headers: new HttpHeaders(`Authorization: Bearer ${token}`),
          params: new HttpParams().set("id", id),
          observe:'response',
        }).pipe(
          map(res => res.ok)
        )
      })
    );
  }
}
