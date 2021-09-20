import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/redux/actions/user-actions';
import { AppState } from 'src/app/redux/state.models';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-register-login-dialog',
  templateUrl: './register-login-dialog.component.html',
  styleUrls: ['./register-login-dialog.component.scss']
})
export class RegisterLoginDialogComponent {
  @Input() login = '';
  @Input() password = '';
  @Input() firstName = '';
  @Input() lastName = '';
  @Input() newLogin = '';
  @Input() newPassword = '';

  constructor(
    public dialogRef: MatDialogRef<RegisterLoginDialogComponent>,
    private userService: AuthorizationService,
    private store: Store<AppState>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  logIn(): void {
    this.userService.loginUser(this.login, this.password).subscribe(token => {
      this.store.dispatch(getUser({token}));
    });
    this.dialogRef.close();
  }

  register(): void {
    this.userService.registerUser(
      this.firstName, this.lastName, this.newLogin, this.newPassword
      ).subscribe(token => {
        this.store.dispatch(getUser({token}));
      });
      this.dialogRef.close();
  }
}
