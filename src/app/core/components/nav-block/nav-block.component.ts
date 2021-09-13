import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-block',
  templateUrl: './nav-block.component.html',
  styleUrls: ['./nav-block.component.scss']
})
export class NavBlockComponent{
  @Output() onCatalogBtnClick = new EventEmitter<any>();
  @Input() isCatalogOpen = false;

  toggleCatalog(){
    this.isCatalogOpen = !this.isCatalogOpen;
    this.onCatalogBtnClick.emit();
  }
}
