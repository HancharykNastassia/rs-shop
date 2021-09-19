import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCategories } from './redux/actions/categories-actions';
import { getUser } from './redux/actions/user-actions';
import { AppState } from './redux/state.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rs-shop';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getCategories());
    this.store.dispatch(getUser());
  }
}
