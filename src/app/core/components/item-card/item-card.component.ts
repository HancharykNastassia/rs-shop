import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getUserChanges } from 'src/app/redux/actions/user-actions';
import { AppState } from 'src/app/redux/state.models';
import { ItemModel } from '../../models/item-models';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item!: ItemModel;

  subscrition = new Subscription();

  ratingArray?: unknown[];

  constructor(private dataService: GoodsService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.ratingArray = new Array(this.item.rating);
  }

  addItemToChart(id: string) {
    this.subscrition.add(this.dataService.addItemToChart(id).subscribe((res) => {
      if (res) this.store.dispatch(getUserChanges());
    }));
  }

  addItemToFavorites(id: string) {
    this.subscrition.add(this.dataService.addItemToFavorites(id).subscribe((res) => {
      if (res) this.store.dispatch(getUserChanges());
    }))
  }
}
