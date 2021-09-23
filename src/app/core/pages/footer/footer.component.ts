import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    './footer.component.scss',
    '../../components/contacts/contacts.component.scss',
  ],
})
export class FooterComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'vk',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/vk.svg')
    );
    iconRegistry.addSvgIcon(
      'fb',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg')
    );
    iconRegistry.addSvgIcon(
      'insta',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/instagram.svg')
    );
    iconRegistry.addSvgIcon(
      'youtube',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/youtube.svg')
    );
    iconRegistry.addSvgIcon(
      'ok',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/odnoklassniki.svg')
    );
  }
}
