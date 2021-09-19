import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/redux/state.models';
import { User } from '../../models/user';

@Component({
  selector: 'app-nav-block',
  templateUrl: './nav-block.component.html',
  styleUrls: ['./nav-block.component.scss']
})
export class NavBlockComponent implements OnInit{
  @Output() onCatalogBtnClick = new EventEmitter<any>();
  @Input() isCatalogOpen = false;
  @Input() user$!: Observable<User | undefined>

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.user$ = this.store.select((state) => state.user.user);
  }

  toggleCatalog(){
    this.isCatalogOpen = !this.isCatalogOpen;
    this.onCatalogBtnClick.emit();
  }
}
