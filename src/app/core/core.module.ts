import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../shared/shared.module';
import { ContactsComponent } from './components/contacts/contacts.component';
import { LocationComponent } from './components/location/location.component';
import { InfoBlockComponent } from './components/info-block/info-block.component';
import { NavBlockComponent } from './components/nav-block/nav-block.component';
import { HeaderComponent } from './pages/header/header.component';
import { CategoryNavBlockComponent } from './components/category-nav-block/category-nav-block.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { AvailiableDirective } from './directives/availiable.directive';
import { SortPipe } from './pipes/sort.pipe';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { RegisterLoginDialogComponent } from './components/register-login-dialog/register-login-dialog.component';
import { CartCardComponent } from './components/cart-card/cart-card.component';
import { ChartComponent } from './pages/chart/chart.component';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [
    ContactsComponent,
    LocationComponent,
    InfoBlockComponent,
    NavBlockComponent,
    HeaderComponent,
    CategoryNavBlockComponent,
    CatalogComponent,
    ItemCardComponent,
    CategoryPageComponent,
    AvailiableDirective,
    SortPipe,
    DetailsPageComponent,
    RegisterLoginDialogComponent,
    CartCardComponent,
    ChartComponent,
    MainComponent,
  ],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, CarouselModule, SharedModule, RouterModule],
  exports: [HeaderComponent, MainComponent, CategoryPageComponent,DetailsPageComponent, ChartComponent],
})
export class CoreModule {}
