import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './redux/reducers/app-reducer';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from './redux/effects/categories-effects';
import { UserEffects } from './redux/effects/user-effects';
import { CanNavigateGuard } from './core/guards/can-navigate.guard';
import { HttpReqInterceptor } from './core/interceptors/http-req.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    StoreModule.forRoot(reducer),
    EffectsModule.forRoot([CategoriesEffects, UserEffects]),
  ],
  providers: [
    CanNavigateGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpReqInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
