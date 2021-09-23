import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';
import { getUser } from 'src/app/redux/actions/user-actions';
import { AppState } from 'src/app/redux/state.models';
import { CategoryModel } from '../../models/category-models';
import { ItemModel } from '../../models/item-models';
import { User } from '../../models/user';
import { AuthorizationService } from '../../services/authorization.service';
import { GoodsService } from '../../services/goods.service';
import { RegisterLoginDialogComponent } from '../register-login-dialog/register-login-dialog.component';

@Component({
  selector: 'app-nav-block',
  templateUrl: './nav-block.component.html',
  styleUrls: ['./nav-block.component.scss'],
})
export class NavBlockComponent implements OnInit {
  @Output() catalogBtnClick = new EventEmitter<any>();

  @Input() isCatalogOpen = false;

  @Input() user$!: Observable<User | undefined>;

  searchInputControl = new FormControl();

  searchItems$?: Observable<ItemModel[]>;

  searchCategories$?: Observable<CategoryModel[]>;

  login?: string;

  password?: string;

  constructor(
    public dialog: MatDialog,
    private userService: AuthorizationService,
    private dataService: GoodsService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select((state) => state.user.user);
    this.searchItems$ = this.searchInputControl.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      filter<string>((value) => value.length > 2),
      switchMap((value) =>
        this.dataService
          .searchItem(value)
          .pipe(map((item) => item.splice(6, item.length + 1)))
      )
    );
    this.searchCategories$ = this.searchInputControl.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      filter<string>((value) => value.length > 2),
      switchMap((value) =>
        this.store.select((state) =>
          state.categories.categories.filter((cat) =>
            cat.name.toLowerCase().includes(value)
          )
        )
      )
    );
  }

  toggleCatalog() {
    this.isCatalogOpen = !this.isCatalogOpen;
    this.catalogBtnClick.emit();
  }

  openDialog(): void {
    this.dialog.open(RegisterLoginDialogComponent);
  }

  logOut(): void {
    this.userService.logoutUser();
    this.store.dispatch(getUser({ token: '' }));
  }
}
