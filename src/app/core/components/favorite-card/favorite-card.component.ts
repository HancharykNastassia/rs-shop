import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getUserChanges } from 'src/app/redux/actions/user-actions';
import { AppState } from 'src/app/redux/state.models';
import { ItemModel } from '../../models/item-models';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent implements OnInit, OnDestroy {
  @Input() item!: ItemModel;

  ratingArray?: unknown[];
  subscription = new Subscription()

  constructor(private dataService: GoodsService, private store: Store<AppState>) {}

  ngOnInit():void {
    this.ratingArray = new Array(this.item.rating);
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  addItemToChart(): void {
    this.subscription.add(this.dataService.addItemToChart(this.item.id).subscribe(res => {
      if (res) this.store.dispatch(getUserChanges());
    }));
  }

  removeFromFavorites():void {
    this.subscription.add(
      this.dataService.removeItemFromFavorites(this.item.id).subscribe(res => {
        if (res) this.store.dispatch(getUserChanges());
      })
    )
  }
}
