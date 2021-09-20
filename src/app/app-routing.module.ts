import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './core/pages/category-page/category-page.component';
import { ChartComponent } from './core/pages/chart/chart.component';
import { DetailsPageComponent } from './core/pages/details-page/details-page.component';

const routes: Routes = [
  // {
  //   path: '', redirectTo: 'main', component:
  // }
  {
    path: 'category', component: CategoryPageComponent,
  },
  {
    path: 'details', component: DetailsPageComponent
  },
  {
    path: 'chart', component: ChartComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
