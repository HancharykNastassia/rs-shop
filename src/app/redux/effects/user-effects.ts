import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { AuthorizationService } from "src/app/core/services/authorization.service";
import { getUser, getUserSuccess } from "../actions/user-actions";

@Injectable()
export class UserEffects {

  getUsers = createEffect(() =>
  this.actions.pipe(
    ofType(getUser),
    switchMap(({token}) => this.userService.getUserInfo(token).pipe(
      map(user => getUserSuccess({user}))
    ))
  )
  );
  constructor(private actions: Actions, private userService: AuthorizationService){}
}
