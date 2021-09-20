import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthorizationService } from './core/services/authorization.service';
import { getCategories } from './redux/actions/categories-actions';
import { getUser } from './redux/actions/user-actions';
import { AppState } from './redux/state.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rs-shop';
  subscription!: Subscription;

  constructor(private userService: AuthorizationService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getCategories());
    this.subscription = this.userService.checkLocalStroage().subscribe((token) => {
      if (token && token.length > 0) {
        this.store.dispatch(getUser({token}));
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
