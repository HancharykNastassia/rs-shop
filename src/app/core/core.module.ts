import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { RouterModule } from '@angular/router';

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
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [HeaderComponent, CategoryPageComponent],
})
export class CoreModule {}
