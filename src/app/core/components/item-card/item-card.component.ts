import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { getUserChanges } from 'src/app/redux/actions/user-actions';
import { AppState } from 'src/app/redux/state.models';
import { ItemModel } from '../../models/item-models';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit, OnDestroy {
  @Input() item!: ItemModel;

  subscrition= new Subscription();
  ratingArray?: unknown[];
  isInChart$!: Observable<boolean>;
  isInFavorite$!: Observable<boolean>;

  constructor(private dataService: GoodsService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.ratingArray = new Array(this.item.rating);
    this.isInChart$ = this.store.select((state) => state.user.user?.cart).pipe(
      map(ids => {
        if (ids) return Boolean(ids?.find(id => id === this.item.id));
          return false;
      })
    );
    this.isInFavorite$ = this.store.select((state) => state.user.user?.favorites).pipe(
      map(ids => {
        if (ids) return Boolean(ids?.find(id => id === this.item.id));
          return false;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscrition.unsubscribe();
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
