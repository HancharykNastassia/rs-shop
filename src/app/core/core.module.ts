import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ContactsComponent } from './components/contacts/contacts.component';
import { LocationComponent } from './components/location/location.component';
import { InfoBlockComponent } from './components/info-block/info-block.component';
import { NavBlockComponent } from './components/nav-block/nav-block.component';
import { HeaderComponent } from './pages/header/header.component';
import { CategoryNavBlockComponent } from './components/category-nav-block/category-nav-block.component';

@NgModule({
  declarations: [
    ContactsComponent,
    LocationComponent,
    InfoBlockComponent,
    NavBlockComponent,
    HeaderComponent,
    CategoryNavBlockComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
