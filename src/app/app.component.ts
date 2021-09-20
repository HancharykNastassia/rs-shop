import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthorizationService } from './core/services/authorization.service';
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

  constructor(private userService: AuthorizationService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getCategories());
    const token = this.userService.checkLocalStroage()
    if (token){
      this.store.dispatch(getUser({token}));
    }
  }
}
