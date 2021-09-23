import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  panelOpenState = false;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer){
    iconRegistry.addSvgIcon('viber', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/free-icon-viber-2111705.svg'));
    iconRegistry.addSvgIcon('telegram', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/telegram.svg'));
  }
}
