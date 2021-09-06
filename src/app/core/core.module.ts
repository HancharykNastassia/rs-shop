import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ContactsComponent } from './components/contacts/contacts.component';
import { LocationComponent } from './components/location/location.component';

@NgModule({
  declarations: [ContactsComponent, LocationComponent],
  imports: [CommonModule, SharedModule],
  exports: [ContactsComponent],
})
export class CoreModule {}
