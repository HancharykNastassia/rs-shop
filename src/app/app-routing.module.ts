import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './core/pages/category-page/category-page.component';
import { ChartComponent } from './core/pages/chart/chart.component';
import { DetailsPageComponent } from './core/pages/details-page/details-page.component';
import { FavotirePageComponent } from './core/pages/favotire-page/favotire-page.component';
import { MainComponent } from './core/pages/main/main.component';
import { OrderPageComponent } from './core/pages/order-page/order-page.component';

const routes: Routes = [
  {
    path: 'category', component: CategoryPageComponent,
  },
  {
    path: 'details', component: DetailsPageComponent
  },
  {
    path: 'chart', component: ChartComponent
  },
  {
    path: 'favorites', component: FavotirePageComponent
  },
  {
    path: 'order-list', component: OrderPageComponent
  },
  {
    path: '', component: MainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
