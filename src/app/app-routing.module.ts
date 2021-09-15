import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './core/pages/category-page/category-page.component';

const routes: Routes = [
  // {
  //   path: '', redirectTo: 'main', component:
  // }
  {
    path: 'category', component: CategoryPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
