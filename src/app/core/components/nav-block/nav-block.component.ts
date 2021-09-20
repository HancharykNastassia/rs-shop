import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUser } from 'src/app/redux/actions/user-actions';
import { AppState } from 'src/app/redux/state.models';
import { User } from '../../models/user';
import { AuthorizationService } from '../../services/authorization.service';
import { RegisterLoginDialogComponent } from '../register-login-dialog/register-login-dialog.component';

@Component({
  selector: 'app-nav-block',
  templateUrl: './nav-block.component.html',
  styleUrls: ['./nav-block.component.scss']
})
export class NavBlockComponent implements OnInit{
  @Output() onCatalogBtnClick = new EventEmitter<any>();
  @Input() isCatalogOpen = false;
  @Input() user$!: Observable<User | undefined>

  login?: string;
  password?: string;

  constructor(public dialog: MatDialog,
              private userService: AuthorizationService,
              private store: Store<AppState>) {}

  ngOnInit(): void {
    this.user$ = this.store.select((state) => state.user.user);
  }

  toggleCatalog(){
    this.isCatalogOpen = !this.isCatalogOpen;
    this.onCatalogBtnClick.emit();
  }

  openDialog(): void {
    this.dialog.open(RegisterLoginDialogComponent);
  }

  logOut(): void {
    this.userService.logoutUser();
    this.store.dispatch(getUser({token: ''}))
  }
}
