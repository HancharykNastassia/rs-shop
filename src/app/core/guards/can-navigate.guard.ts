import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/redux/state.models';

@Injectable({
  providedIn: 'root'
})
export class CanNavigateGuard implements CanActivate {
  constructor(private store: Store<AppState>){}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.store.select((state) => state.user.user).pipe(
        map(user => !!user)
      );
  }
}
