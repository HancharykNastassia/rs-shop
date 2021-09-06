import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ContactsComponent } from './components/contacts/contacts.component';
import { LocationComponent } from './components/location/location.component';
import { InfoBlockComponent } from './components/info-block/info-block.component';

@NgModule({
  declarations: [ContactsComponent, LocationComponent, InfoBlockComponent],
  imports: [CommonModule, SharedModule],
  exports: [InfoBlockComponent],
})
export class CoreModule {}
